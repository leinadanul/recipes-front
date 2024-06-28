import { Action, ActionReducer } from "@ngrx/store";
import { RecipesState, recipesReducer } from "./reducers/recipes.reducers";
import { RecipesEffects } from "./effects/recipes.effects";


export interface AppState{
  recipes: RecipesState;
}
export interface AppStore{
  recipes: ActionReducer<RecipesState, Action>;
}

export const appStore: AppStore ={
  recipes: recipesReducer
}

export const appEffects = [RecipesEffects]
