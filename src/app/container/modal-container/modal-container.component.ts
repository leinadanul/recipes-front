import { ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ModalBlockComponent } from '../../ui/blocks/modal-block/modal-block.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipesService } from '../../core/service/recipes.service';
import { DelteMessageBlockComponent } from '../../ui/blocks/delte-message-block/delte-message-block.component';
import { AsyncPipe } from '@angular/common';
import { deleteRecipe, loadRecipes } from '../../core/store/actions/recipes.actions';
import { Store } from '@ngrx/store';
import { ModalV2Component } from '../../ui/blocks/modal-v2/modal-v2.component';
import { Recipes } from '../../core/models/recipe.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-container',
  standalone: true,
  imports: [MatCardModule, MatDialogModule, ModalV2Component, AsyncPipe],
  templateUrl:'./modal-container.component.html',
})
export class ModalContainerComponent {
  recipeForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  isLoading = false;
  isEditing = false;

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalBlockComponent>,
    private snackBar: MatSnackBar,
    private service: RecipesService,
    private store: Store,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public recipeInfo: Recipes,
    @Inject(MAT_DIALOG_DATA) public data: { recipe: Recipes, isEdit: boolean }
  ) {
    this.recipeForm = this.fb.group({
      name: [{ value: recipeInfo.name, disabled: true }, Validators.required],
      description: [{ value: recipeInfo.description, disabled: true }, Validators.required],
      ingredients: this.fb.array(recipeInfo.ingredients.map(ingredient => this.fb.group({
        ingredient: [{ value: ingredient, disabled: true }, Validators.required]
      }))),
      preparationTime: [{ value: recipeInfo.preparationTime, disabled: true }, Validators.required],
      instructions: [{ value: recipeInfo.instructions, disabled: true }, Validators.required],
      recipeType: [{ value: recipeInfo.recipeType, disabled: true }, Validators.required],
      imageUrl: [recipeInfo.imageUrl || null]
    });

    this.imagePreview = recipeInfo.imageUrl || null;
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

  enableEditing(): void {
    this.isEditing = true;
    this.recipeForm.enable();
  }

  disableEditing(): void {
    this.isEditing = false;
    this.recipeForm.disable();
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  openDeleteConfirmation(): void {
    const dialogRef = this.dialog.open(DelteMessageBlockComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRecipe();
      }
    });
  }

  deleteRecipe(): void {
    this.store.dispatch(deleteRecipe({ recipeId: this.recipeInfo.id }));
    this.isLoading = false;

    setTimeout(() => {
      this.snackBar.open('Recipe deleted successfully', 'Close', {
        duration: 2000,
      });
      this.dialogRef.close(true);
    },);
  }

  saveRecipe(){
    console.log('saveRecipe called in ModalContainerComponent');
    if (this.recipeForm.valid) {
      const updatedRecipe: Recipes = {
        ...this.recipeForm.value,
        ingredients: this.ingredients.value.map((ing: any) => ing.ingredient),
        preparationTime: parseInt(this.recipeForm.value.preparationTime, 10),
      };

      console.log('Updated Recipe:', updatedRecipe);

      this.isLoading = true;

      const minLoadingTime = 1000;
      const startTime = Date.now();

      const handleSuccess = () => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = minLoadingTime - elapsedTime;

        setTimeout(() => {
          this.isLoading = false;
          this.snackBar.open('Recipe updated successfully', 'Close', {
            duration: 3000,
          });
          this.store.dispatch(loadRecipes());
          this.disableEditing();
        }, Math.max(remainingTime, 0));
      };

      this.service.updateRecipeWithImage(this.recipeInfo.id, updatedRecipe, this.selectedFile)
        .subscribe({
          next: handleSuccess,
          error: (error) => {
            this.isLoading = false;
          }
        });
    } else {
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.selectedFile = file;
        this.recipeForm.patchValue({
          imageUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }
}
