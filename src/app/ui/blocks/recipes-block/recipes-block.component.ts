import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { Recipes } from '../../../core/models/recipe.model';

@Component({
  selector: 'app-recipes-block',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatGridListModule, NgFor,NgIf],
  templateUrl: './recipes-block.component.html',
  styleUrl: './recipes-block.component.css'
})
export class RecipesBlockComponent {

  @Input() recipes : Recipes[];
  @Output() recipeClicked = new EventEmitter<Recipes>();

  private detailsVisibilityMap = new Map<string, boolean>();

  onRecipeClick(recipe: Recipes) {
    this.recipeClicked.emit(recipe);
  }

  showDetails(recipe: Recipes) {
    this.detailsVisibilityMap.set(recipe.id, true);
  }

  hideDetails(recipe: Recipes) {
    this.detailsVisibilityMap.set(recipe.id, false);
  }

  isShowingDetails(recipe: Recipes): boolean {
    return this.detailsVisibilityMap.get(recipe.id) || false;
  }

}
