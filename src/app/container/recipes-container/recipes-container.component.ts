import { Component, OnInit } from '@angular/core';
import { RecipesBlockComponent } from '../../ui/blocks/recipes-block/recipes-block.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { ModalContainerComponent } from '../modal-container/modal-container.component';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-recipes-container',
  standalone: true,
  imports: [RecipesBlockComponent, MatCardModule, MatGridListModule, MatIconModule],
  templateUrl: './recipes-container.component.html',
})
export class RecipesContainerComponent implements OnInit {

  recipes = [
    { title: 'Product 1', description: 'Description 1', image: '../../../assets/img/angular.jpg' },
    { title: 'Product 2', description: 'Description 2', image: '../../../assets/img/vue.jpg' },
    { title: 'Product 3', description: 'Description 3', image: '../../../assets/img/react.jpg' },

  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {}

  openDialog(recipe): void {
    this.dialog.open(ModalContainerComponent, {
      data: recipe
    });
  }
}
