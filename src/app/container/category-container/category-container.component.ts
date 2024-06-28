import { Component } from '@angular/core';
import { CategoryBlockComponent } from '../../ui/blocks/category-block/category-block.component';

@Component({
  selector: 'app-category-container',
  standalone: true,
  imports: [CategoryBlockComponent],
  templateUrl: './category-container.component.html',
})
export class CategoryContainerComponent {


  categories = [
    { name: 'Vegan', image: '../../../assets/img/angular.jpg' },
    { name: 'Normal', image: '../../../assets/img/angular.jpg' },
    { name: 'Light', image: '../../../assets/img/react.jpg' },
  ];
}
