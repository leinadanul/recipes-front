import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RecipesService } from '../../../core/service/recipes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DelteMessageBlockComponent } from '../delte-message-block/delte-message-block.component';
import { MatIconModule } from '@angular/material/icon';
import { CreateRecipeContainerComponent } from '../../../container/create-recipe-container/create-recipe-container.component';


@Component({
  selector: 'app-modal-block',
  standalone: true,
  imports: [NgFor,MatIconModule],
  templateUrl: './modal-block.component.html',
  styleUrls: ['./modal-block.component.css']
})
export class ModalBlockComponent {
  @Input() recipeInfo: any;
  constructor(
    private snackBar: MatSnackBar,
    private recipesService: RecipesService,
    private dialogRef: MatDialogRef<ModalBlockComponent>,
    private dialog: MatDialog
  ) {}

  openDeleteConfirmation(): void {
    const dialogRef = this.dialog.open(DelteMessageBlockComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRecipe();
      }
    });
  }

  deleteRecipe(): void {
    this.recipesService.deleteRecipe(this.recipeInfo.id).subscribe(() => {
      this.snackBar.open('Recipe deleted successfully', 'Close', {
        duration: 3000,
      });
      this.dialogRef.close(true);
    }, error => {
      this.snackBar.open('Failed to delete recipe', 'Close', {
        duration: 3000,
      });
    });
  }
  openEditRecipe(): void {
    const dialogRef = this.dialog.open(CreateRecipeContainerComponent, {
      data: { recipe: this.recipeInfo, isEdit: true }
    });
}
}
