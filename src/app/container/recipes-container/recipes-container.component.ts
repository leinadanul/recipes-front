import { Component, OnInit } from '@angular/core';
import { RecipesBlockComponent } from '../../ui/blocks/recipes-block/recipes-block.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { ModalContainerComponent } from '../modal-container/modal-container.component';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { Recipes } from '../../core/models/recipe.model';
import { Router } from '@angular/router';
import { ListAllRecipesFacade } from './recipes-container.facade';
import { AsyncPipe } from '@angular/common';
import { AddButtonComponent } from '../../ui/elements/add-button/add-button.component';
import { CreateRecipeContainerComponent } from '../create-recipe-container/create-recipe-container.component';


@Component({
  selector: 'app-recipes-container',
  standalone: true,
  imports: [RecipesBlockComponent, MatCardModule, MatGridListModule, MatIconModule, AsyncPipe, AddButtonComponent],
  templateUrl: './recipes-container.component.html',
})
export class RecipesContainerComponent implements OnInit {
  public recipes$: Observable<Recipes[]>;

  constructor(
    public dialog: MatDialog,
    //private router: Router,
    private readonly facade: ListAllRecipesFacade
  ) { }

  ngOnInit(): void
  {
    this.facade.loadRecipes();
    this.initializeSubscriptions();
  }
  private initializeSubscriptions(): void {
    this.recipes$ = this.facade.getRecipes$();
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
}
