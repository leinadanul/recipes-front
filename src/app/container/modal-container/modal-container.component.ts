import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalBlockComponent } from '../../ui/blocks/modal-block/modal-block.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-container',
  standalone: true,
  imports: [MatCardModule,MatDialogModule, ModalBlockComponent],
  templateUrl: './modal-container.component.html',
})
export class ModalContainerComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public recipeInfo: any) {}

}
