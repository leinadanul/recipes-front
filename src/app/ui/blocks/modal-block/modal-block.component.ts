import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-block',
  standalone: true,
  templateUrl: './modal-block.component.html',
  styleUrls: ['./modal-block.component.css']
})
export class ModalBlockComponent {
  @Input() data: any;
}
