import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryContainerComponent } from '../../../container/category-container/category-container.component';

@Component({
  selector: 'app-category-block',
  standalone: true,
  imports: [NgFor,RouterLink,CategoryContainerComponent],
  templateUrl: './category-block.component.html',
  styleUrl: './category-block.component.css'
})
export class CategoryBlockComponent {
  @Input() categories: any[]

}
