import { createAction, props } from "@ngrx/store";
import { Recipes } from "../../models/recipe.model";

export const loadRecipes = createAction('[Recipes] Load Recipes');
export const loadRecipesSuccess = createAction('[Recipes] Load Recipes Success', props<{recipes: Recipes[]}>());
export const loadRecipesFailure = createAction('[Recipes] Load Recipes Failure', props<{error: string}>());

export const addRecipe = createAction('[Recipes] Add Recipe', props<{recipe: Recipes, recipePicture: File }>());
export const addRecipeSuccess = createAction('[Recipes] Add Recipe Success', props<{recipe: Recipes}>());
export const addRecipeFailure = createAction('[Recipes] Add Recipe Failure', props<{error: string}>());

export const deleteRecipe = createAction('[Recipes] Delete Recipe', props<{recipeId : string}>());
export const deleteRecipeSuccess = createAction('[Recipes] Delete Recipe Success', props<{ recipeId: string }>());
export const deleteRecipeFailure = createAction('[Recipes] Delete Recipe Failure', props<{error : string}>());

export const updateRecipe = createAction('[Recipes] Update Recipe', props<{recipeId: string, recipe: Recipes, recipePicture: File | null }>());
export const updateRecipeSuccess = createAction('[Recipes] Update Recipe Success', props<{ recipeId: string, recipe: Recipes }>());
export const updateRecipeFailure = createAction('[Recipes] Update Recipe Failure', props<{error: string}>());
