import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateRecipeContainerFacade } from './create-recipe-container.facade';
import { Recipes } from '../../core/models/recipe.model';
import { CreateRecipeBlockComponent } from '../../ui/blocks/create-recipe-block/create-recipe-block.component';

@Component({
  selector: 'app-create-recipe-container',
  standalone: true,
  imports: [CreateRecipeBlockComponent],
  templateUrl: './create-recipe-container.component.html',
})
export class CreateRecipeContainerComponent {
  recipeForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialogRef<CreateRecipeContainerComponent>,
    private facade: CreateRecipeContainerFacade,
    @Inject(MAT_DIALOG_DATA) public data: Recipes

  )
  {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
      preparationTime: ['', Validators.required],
      imageUrl: ['', Validators.required],
      instructions: ['', Validators.required],
      recipeType: ['', Validators.required]
    });
  }

  onSubmit(){
    if(this.recipeForm.valid){
      const recipe: Recipes = this.recipeForm.value;
      this.facade.addRecipe(recipe);
      this.dialog.close();
    }
  }
  onCancel(){
    this.dialog.close();
  }


}
