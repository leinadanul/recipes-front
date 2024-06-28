import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { Recipes } from '../../../core/models/recipe.model';

@Component({
  selector: 'app-recipes-block',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatGridListModule, NgFor],
  templateUrl: './recipes-block.component.html',
  styleUrl: './recipes-block.component.css'
})
export class RecipesBlockComponent {

  @Input() recipes : Recipes[];
  @Output() recipeClicked = new EventEmitter<Recipes>();
  @Input() createRecipe!: () => void;


  onRecipeClick(recipe: Recipes) {
    this.recipeClicked.emit(recipe);
  }

}
