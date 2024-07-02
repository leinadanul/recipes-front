import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateRecipeContainerFacade } from './create-recipe-container.facade';
import { Recipes } from '../../core/models/recipe.model';
import { CreateRecipeBlockComponent } from '../../ui/blocks/create-recipe-block/create-recipe-block.component';
import { RecipesService } from '../../core/service/recipes.service';

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

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialogRef<CreateRecipeContainerComponent>,
    private facade: CreateRecipeContainerFacade,
    private service: RecipesService,
    @Inject(MAT_DIALOG_DATA) public data: Recipes
  ) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.fb.array([]),
      preparationTime: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      imageUrl: [''],
      instructions: ['', Validators.required],
      recipeType: ['', Validators.required]
    });

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

      this.service.createRecipeWithImage(recipe, this.selectedFile).subscribe(
        () => {
          this.dialog.close();
        },
        (error) => {
          console.error('Failed to create recipe', error);
        }
      );
    }
  }

  onCancel() {
    this.dialog.close();
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
