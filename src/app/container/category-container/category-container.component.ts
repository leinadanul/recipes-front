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
    { name: 'food1', image: '../../../assets/img/angular.jpg' },
    { name: 'food2', image: '../../../assets/img/angular.jpg' },
    { name: 'food3', image: '../../../assets/img/react.jpg' },
    { name: 'food4', image: '../../../assets/img/react.jpg' },
    { name: 'food5', image: '../../../assets/img/vue.jpg' },
    { name: 'food6', image: '../../../assets/img/vue.jpg' }
  ];
}
