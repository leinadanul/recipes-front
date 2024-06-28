import { createReducer, on } from "@ngrx/store";
import { loadRecipes, loadRecipesSuccess, loadRecipesFailure } from "../actions/recipes.actions";
import { Recipes } from "../../models/recipe.model";

export interface RecipesState {
  recipes: Recipes[];
  loading: boolean;
  error: string | null;
}

export const initialState: RecipesState = {
  recipes: [],
  loading: false,
  error: null,
};

export const recipesReducer = createReducer(
  initialState,
  on(loadRecipes, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadRecipesSuccess, (state, { recipes }) => ({
    ...state,
    recipes,
    loading: false,
  })),
  on(loadRecipesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
