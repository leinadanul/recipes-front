import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { CarouselCaptionComponent, CarouselComponent, CarouselControlComponent, CarouselIndicatorsComponent, CarouselInnerComponent, CarouselItemComponent, ThemeDirective } from '@coreui/angular';
import { CarouselBlockComponent } from "../../ui/blocks/carousel-block/carousel-block.component";

@Component({
  selector: 'app-carousel-container',
  standalone: true,
  templateUrl: './carousel-container.component.html',
  imports: [
    ThemeDirective,
    CarouselComponent,
    CarouselIndicatorsComponent,
    CarouselInnerComponent,
    NgFor,
    CarouselItemComponent,
    CarouselCaptionComponent,
    CarouselControlComponent,
    RouterLink,
    CarouselBlockComponent
  ]
})
export class CarouselContainerComponent implements OnInit {
  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });

  ngOnInit(): void {
    console.log('CarouselContainerComponent initialized');
    this.slides[0] = {
      id: 0,
      src: '../../../assets/img/cloudy-lemon-pie-163801-2.jpg',
      title: 'First slide',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    };
    this.slides[1] = {
      id: 1,
      src: '../../../assets/img/cloudy-lemon-pie-163801-2.jpg',
      title: 'Second slide',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    };
    this.slides[2] = {
      id: 2,
      src: '../../../assets/img/cloudy-lemon-pie-163801-2.jpg',
      title: 'Third slide',
      subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    };
  }
}
