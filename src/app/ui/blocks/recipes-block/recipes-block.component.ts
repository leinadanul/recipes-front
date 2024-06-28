import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-recipes-block',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatGridListModule, NgFor],
  templateUrl: './recipes-block.component.html',
  styleUrl: './recipes-block.component.css'
})
export class RecipesBlockComponent {

  @Input() recipes: any[];
  @Output() productClicked = new EventEmitter<any>();
  onProductClick(product: any) {
    this.productClicked.emit(product);
  }

}
