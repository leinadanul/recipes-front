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
    { name: 'Vegan', image: '../../../assets/img/Ponzu-tofu-poke-bowl-8733c67.jpg' },
    { name: 'Meet', image: '../../../assets/img/meat.jpg' },
    { name: 'Light', image: '../../../assets/img/benefiber-light-spring-meals-that-satisfy-main.jpg' },
  ];
}
