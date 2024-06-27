import { Component, OnInit } from '@angular/core';
import { RecipesBlockComponent } from '../../ui/blocks/recipes-block/recipes-block.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';


@Component({
  selector: 'app-recipes-container',
  standalone: true,
  imports: [RecipesBlockComponent,MatCardModule, MatGridListModule ],
  templateUrl: './recipes-container.component.html',
})
export class RecipesContainerComponent implements OnInit {

  recipes = [
    { title: 'Product 1', description: 'Description 1', image: '../../../assets/img/angular.jpg' },
    { title: 'Product 2', description: 'Description 2', image: '../../../assets/img/vue.jpg' },
    { title: 'Product 3', description: 'Description 3', image: '../../../assets/img/react.jpg' }
  ];
  constructor() { }

  ngOnInit(): void {

  }


}
