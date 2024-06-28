import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../core/store/store";
import { Observable } from "rxjs";
import { Recipes } from "../../core/models/recipe.model";
import { selectAllRecipes } from "../../core/store/selectors/recipes.selectors";
import * as RecipeActions from "../../core/store/actions/recipes.actions"



@Injectable({
  providedIn: 'root'
})
export class ListAllRecipesFacade{
  constructor(private readonly store: Store<AppState>){}

  getRecipes$(): Observable<Recipes[]>
  {
  return this.store.select(selectAllRecipes)
  }
  loadRecipes() : void{
    this.store.dispatch(RecipeActions.loadRecipes());
  }
}

