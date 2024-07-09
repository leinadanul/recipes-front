import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";
import { AppState } from "../../core/store/store";
import { Store } from "@ngrx/store";
import { Recipes } from "../../core/models/recipe.model";
import { addRecipe, updateRecipe } from "../../core/store/actions/recipes.actions";
import * as RecipeActions from '../../core/store/actions/recipes.actions';
import { RecipesService } from "../../core/service/recipes.service";


@Injectable({
  providedIn: 'root',
})
export class CreateRecipeContainerFacade {
  constructor(
    private readonly store: Store<AppState>,
    private service: RecipesService
  ) {}

  createRecipeWithImage(recipe: Recipes, recipePicture: File | null) {
    this.service.createRecipeWithImage(recipe, recipePicture).subscribe(
      (newRecipe) => {
        this.store.dispatch(addRecipe({ recipe: newRecipe, recipePicture }));
      },
      (error) => {
        console.error('Failed to create recipe', error);
      }
    );
  }

  updateRecipeWithImage(recipeId: string, recipe: Recipes, recipePicture: File | null) {
    this.service.updateRecipeWithImage(recipeId, recipe, recipePicture).subscribe(
      (updatedRecipe) => {
        this.store.dispatch(updateRecipe({ recipeId, recipe: updatedRecipe, recipePicture }));
      },
      (error) => {
        console.error('Failed to update recipe', error);
      }
    );
  }
}
