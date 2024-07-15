import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-delte-message-block',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatProgressSpinnerModule, NgIf ],
  templateUrl: './delte-message-block.component.html',
  styleUrl: './delte-message-block.component.css'
})
export class DelteMessageBlockComponent {
  isLoading = false;

  constructor(private dialogRef: MatDialogRef<DelteMessageBlockComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.isLoading = true;
    const minLoadingTime = 1000;
    const startTime = Date.now();

    setTimeout(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = minLoadingTime - elapsedTime;

      setTimeout(() => {
        this.isLoading = false;
        this.dialogRef.close(true);
      }, Math.max(remainingTime, 0));
    }, 3000);
  }
}
