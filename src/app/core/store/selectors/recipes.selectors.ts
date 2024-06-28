import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RecipesState } from "../reducers/recipes.reducers";

export const selectRecipesState = createFeatureSelector<RecipesState>('recipes');

export const selectAllRecipes = createSelector(
  selectRecipesState,
  (state: RecipesState) => state.recipes
);

export const selectRecipesLoading = createSelector(
  selectRecipesState,
  (state: RecipesState) => state.loading
);

export const selectRecipesError = createSelector(
  selectRecipesState,
  (state: RecipesState) => state.error
);
