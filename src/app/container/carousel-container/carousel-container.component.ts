import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../core/service/recipes.service';
import { Recipes } from '../../core/models/recipe.model';
import { CarouselBlockComponent } from '../../ui/blocks/carousel-block/carousel-block.component';
import { ModalContainerComponent } from '../modal-container/modal-container.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-carousel-container',
  standalone: true,
  templateUrl: './carousel-container.component.html',
  imports: [CarouselBlockComponent]
})


export class CarouselContainerComponent implements OnInit {
  randomRecipes: Recipes[] = [];

  constructor(private recipesService: RecipesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.recipesService.getRandomRecipes(3).subscribe((recipes) => {
      this.randomRecipes = recipes;
    });
  }
  openDialog(recipe: Recipes): void {
    this.dialog.open(ModalContainerComponent, {
      data: recipe
    });
  }
}
