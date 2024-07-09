import { Component, OnInit } from '@angular/core';
import { RecipesBlockComponent } from '../../ui/blocks/recipes-block/recipes-block.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { ModalContainerComponent } from '../modal-container/modal-container.component';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { Recipes } from '../../core/models/recipe.model';
import { ListAllRecipesFacade } from './recipes-container.facade';
import { AsyncPipe } from '@angular/common';
import { AddButtonComponent } from '../../ui/elements/add-button/add-button.component';
import { CreateRecipeContainerComponent } from '../create-recipe-container/create-recipe-container.component';
import { Store } from '@ngrx/store';
import { deleteRecipe, loadRecipes, updateRecipe } from '../../core/store/actions/recipes.actions';
import { selectAllRecipes, selectRecipesError, selectRecipesLoading } from '../../core/store/selectors/recipes.selectors';


@Component({
  selector: 'app-recipes-container',
  standalone: true,
  imports: [RecipesBlockComponent, MatCardModule, MatGridListModule, MatIconModule, AsyncPipe, AddButtonComponent],
  templateUrl: './recipes-container.component.html',
})
export class RecipesContainerComponent implements OnInit {
  public recipes$: Observable<Recipes[]>;
  public loading$: Observable<boolean>;
  public error$: Observable<string | null>;

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private readonly facade: ListAllRecipesFacade
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadRecipes());
    this.recipes$ = this.store.select(selectAllRecipes);
    this.loading$ = this.store.select(selectRecipesLoading);
    this.error$ = this.store.select(selectRecipesError);
  }

  openDialog(recipe: Recipes): void {
    this.dialog.open(ModalContainerComponent, {
      data: recipe
    });
  }

  createRecipe = (): void => {
    this.dialog.open(CreateRecipeContainerComponent, {
      width: '80vw',
      height: '80vh',
      data: {
        recipe: {
          name: '',
          description: '',
          ingredients: [],
          preparationTime: null,
          imageUrl: '',
          instructions: '',
          recipeType: ''
        },
        isEdit: false
      }
    });
  }
  deleteRecipe(recipeId: string): void {
    this.store.dispatch(deleteRecipe({ recipeId }));
  }

  updateRecipe(recipeId: string, recipe: Recipes, recipePicture: File): void {
    this.store.dispatch(updateRecipe({ recipeId, recipe,recipePicture }));
  }
}
