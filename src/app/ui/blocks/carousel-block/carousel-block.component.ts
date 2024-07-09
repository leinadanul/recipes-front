import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Recipes } from '../../../core/models/recipe.model';

@Component({
  selector: 'app-carousel-block',
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
  ],
  templateUrl: './carousel-block.component.html',
  styleUrls: ['./carousel-block.component.css']
})
export class CarouselBlockComponent {
  @Input() slides: any[];
  @Input() randomRecipes: any[];
  @Output() recipeClicked = new EventEmitter<Recipes>();

  currentIndex: number = 0;

  onRecipeClick(recipe: Recipes) {
    this.recipeClicked.emit(recipe);
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.randomRecipes.length - 1;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex < this.randomRecipes.length - 1) ? this.currentIndex + 1 : 0;
  }
}
