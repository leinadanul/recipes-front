import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-modal-block',
  standalone: true,
  imports: [NgFor,MatIconModule],
  templateUrl: './modal-block.component.html',
  styleUrls: ['./modal-block.component.css']
})
export class ModalBlockComponent {
  @Input() recipeInfo: any;
  @Output() deleteRecipeEvent = new EventEmitter<void>();
  @Output() editRecipeEvent = new EventEmitter<void>();
  openDeleteConfirmation(): void {
    this.deleteRecipeEvent.emit();
  }
  openEditRecipe(): void {
    this.editRecipeEvent.emit();
  }
}
