import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RecipesService } from "../../service/recipes.service";
import { loadRecipes, loadRecipesSuccess, loadRecipesFailure } from "../actions/recipes.actions";
import { catchError, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";

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

  constructor(
    private actions$: Actions,
    private recipeService: RecipesService
  ) {}
}
