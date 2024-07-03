import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delte-message-block',
  standalone: true,
  imports: [],
  templateUrl: './delte-message-block.component.html',
  styleUrl: './delte-message-block.component.css'
})
export class DelteMessageBlockComponent {
  constructor(private dialogRef: MatDialogRef<DelteMessageBlockComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
