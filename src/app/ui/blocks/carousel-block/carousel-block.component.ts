import { Component, Input } from '@angular/core';
import { CarouselContainerComponent } from '../../../container/carousel-container/carousel-container.component';
import { NgFor } from '@angular/common';
import {CarouselCaptionComponent,CarouselComponent,CarouselControlComponent,CarouselIndicatorsComponent,CarouselInnerComponent,CarouselItemComponent,ThemeDirective} from '@coreui/angular';
import { RouterLink } from '@angular/router';
import 'bootstrap/dist/css/bootstrap.min.css'


@Component({
  selector: 'app-carousel-block',
  standalone: true,
  imports: [CarouselContainerComponent, RouterLink, NgFor, CarouselCaptionComponent,CarouselComponent,CarouselControlComponent,CarouselIndicatorsComponent,CarouselInnerComponent,CarouselItemComponent,ThemeDirective],
  templateUrl: './carousel-block.component.html',
  styleUrl: './carousel-block.component.css'
})
export class CarouselBlockComponent {

  @Input() slides: any[];


}
