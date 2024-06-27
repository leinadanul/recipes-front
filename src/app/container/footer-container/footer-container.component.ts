import { Component } from '@angular/core';
import { FooterBlockComponent } from '../../ui/blocks/footer-block/footer-block.component';

@Component({
  selector: 'app-footer-container',
  standalone: true,
  imports: [FooterBlockComponent],
  templateUrl: './footer-container.component.html',
})
export class FooterContainerComponent {

}
