import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateRecipeContainerFacade } from './create-recipe-container.facade';
import { Recipes } from '../../core/models/recipe.model';
import { CreateRecipeBlockComponent } from '../../ui/blocks/create-recipe-block/create-recipe-block.component';
import { RecipesService } from '../../core/service/recipes.service';
import { loadRecipes } from '../../core/store/actions/recipes.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-recipe-container',
  standalone: true,
  imports: [CreateRecipeBlockComponent],
  templateUrl: './create-recipe-container.component.html',
})
export class CreateRecipeContainerComponent {
  recipeForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateRecipeContainerComponent>,
    private service: RecipesService,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: { recipe: Recipes, isEdit: boolean }
  ) {
    this.recipeForm = this.fb.group({
      name: [data.recipe.name || '', Validators.required],
      description: [data.recipe.description || '', Validators.required],
      ingredients: this.fb.array(data.recipe.ingredients.map(ing => this.fb.group({ ingredient: [ing, Validators.required] }))),
      preparationTime: [data.recipe.preparationTime || null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      imageUrl: [data.recipe.imageUrl || ''],
      instructions: [data.recipe.instructions || '', Validators.required],
      recipeType: [data.recipe.recipeType || '', Validators.required]
    });

    this.imagePreview = data.recipe.imageUrl || null;
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient(): void {
    this.ingredients.push(this.fb.group({
      ingredient: ['', Validators.required]
    }));
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }
  onSubmit() {
    if (this.recipeForm.valid) {
      const recipe: Recipes = {
        ...this.recipeForm.value,
        ingredients: this.ingredients.value.map((ing: any) => ing.ingredient),
        preparationTime: parseInt(this.recipeForm.value.preparationTime, 10),
      };

      this.isLoading = true;

      const minLoadingTime = 1000;
      const startTime = Date.now();

      const handleSuccess = () => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = minLoadingTime - elapsedTime;

        setTimeout(() => {
          this.isLoading = false;
          this.dialogRef.close();
          this.store.dispatch(loadRecipes());
        }, Math.max(remainingTime, 0));
      };

      if (this.data.isEdit) {
        this.service.updateRecipeWithImage(this.data.recipe.id, recipe, this.selectedFile).subscribe(handleSuccess, () => {
          this.isLoading = false;
        });
      } else {
        this.service.createRecipeWithImage(recipe, this.selectedFile).subscribe(handleSuccess, () => {
          this.isLoading = false;
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.selectedFile = file;
        this.recipeForm.patchValue({
          imageUrl: this.imagePreview
        });
      };
      reader.readAsDataURL(file);
    }
  }
}
