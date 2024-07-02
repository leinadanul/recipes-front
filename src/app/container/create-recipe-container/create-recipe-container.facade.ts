import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";
import { AppState } from "../../core/store/store";
import { Store } from "@ngrx/store";
import { Recipes } from "../../core/models/recipe.model";
import { addRecipe } from "../../core/store/actions/recipes.actions";

@Injectable({
  providedIn: 'root',
})
export class CreateRecipeContainerFacade {
  private subscription: Subscription = new Subscription();
  constructor(private readonly store: Store<AppState>) {}

  addRecipe(recipe: Recipes): void {
    this.store.dispatch(addRecipe({ recipe }));
  }

  initSubscription(): void {
    this.subscription = new Subscription();
  }

  destroySubscription(): void {
    this.subscription.unsubscribe();
  }
}
