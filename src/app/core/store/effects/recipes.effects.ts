import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RecipesService } from '../../service/recipes.service';
import {
  addRecipe, loadRecipes, loadRecipesSuccess, loadRecipesFailure,
  deleteRecipe, deleteRecipeSuccess, deleteRecipeFailure,
  updateRecipe, updateRecipeSuccess, updateRecipeFailure
} from '../actions/recipes.actions';
import { Injectable } from '@angular/core';

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
        this.recipeService.addRecipe(action.recipe).pipe(
          map(() => loadRecipes()),
          catchError(error => of(loadRecipesFailure({ error: error.message })))
        )
      )
    )
  );

  deleteRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteRecipe),
      mergeMap(action =>
        this.recipeService.deleteRecipe(action.recipeId).pipe(
          map(() => deleteRecipeSuccess({ recipeId: action.recipeId })),
          catchError(error => of(deleteRecipeFailure({ error: error.message })))
        )
      )
    )
  );

  updateRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRecipe),
      mergeMap(action =>
        this.recipeService.updateRecipe(action.recipeId, action.recipe).pipe(
          map(() => updateRecipeSuccess({ recipeId: action.recipeId, recipe: action.recipe })),
          catchError(error => of(updateRecipeFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private recipeService: RecipesService
  ) {}
}
