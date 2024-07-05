import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RecipesService } from '../../service/recipes.service';
import {
  addRecipe, loadRecipes, loadRecipesSuccess, loadRecipesFailure,
  deleteRecipe, deleteRecipeSuccess, deleteRecipeFailure,
  updateRecipe, updateRecipeSuccess, updateRecipeFailure,
  addRecipeSuccess,
  addRecipeFailure
} from '../actions/recipes.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipesEffects {

  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRecipes),
      mergeMap(() =>
        this.recipeService.getAllRecipes().pipe(
          map(recipes => loadRecipesSuccess({ recipes })),
          catchError(error => of(loadRecipesFailure({ error: error.message })))
        )
      )
    )
  );

  addRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRecipe),
      mergeMap(action =>
        this.recipeService.createRecipeWithImage(action.recipe, action.recipePicture).pipe(
          map(newRecipe => {
            this.store.dispatch(loadRecipes());  // Despachar la acción para recargar recetas
            return addRecipeSuccess({ recipe: newRecipe });
          }),
          catchError(error => of(addRecipeFailure({ error: error.message })))
        )
      )
    )
  );

  deleteRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteRecipe),
      mergeMap(action =>
        this.recipeService.deleteRecipe(action.recipeId).pipe(
          map(() => {
            this.store.dispatch(loadRecipes());  // Despachar la acción para recargar recetas
            return deleteRecipeSuccess({ recipeId: action.recipeId });
          }),
          catchError(error => of(deleteRecipeFailure({ error: error.message })))
        )
      )
    )
  );

  updateRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRecipe),
      mergeMap(action =>
        this.recipeService.updateRecipeWithImage(action.recipeId, action.recipe, action.recipePicture).pipe(
          map(updatedRecipe => {
            this.store.dispatch(loadRecipes());  // Despachar la acción para recargar recetas
            return updateRecipeSuccess({ recipeId: action.recipeId, recipe: updatedRecipe });
          }),
          catchError(error => of(updateRecipeFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private recipeService: RecipesService,
    private store: Store
  ) {}
}
