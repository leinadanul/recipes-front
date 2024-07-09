import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ModalBlockComponent } from '../../ui/blocks/modal-block/modal-block.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipesService } from '../../core/service/recipes.service';
import { DelteMessageBlockComponent } from '../../ui/blocks/delte-message-block/delte-message-block.component';
import { CreateRecipeContainerComponent } from '../create-recipe-container/create-recipe-container.component';
import { AsyncPipe } from '@angular/common';
import { deleteRecipe } from '../../core/store/actions/recipes.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/store';


@Component({
  selector: 'app-modal-container',
  standalone: true,
  imports: [MatCardModule,MatDialogModule, ModalBlockComponent, AsyncPipe],
  templateUrl: './modal-container.component.html',
})
export class ModalContainerComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public recipeInfo: any,
    private snackBar: MatSnackBar,
    private recipesService: RecipesService,
    private dialogRef: MatDialogRef<ModalBlockComponent>,
    private dialog: MatDialog,
    private store: Store<AppState>

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
    this.store.dispatch(deleteRecipe({ recipeId: this.recipeInfo.id }));
    this.snackBar.open('Recipe deleted successfully', 'Close', {
      duration: 3000,
    });
    this.dialogRef.close(true);
  }
  openEditRecipe(): void {
    const dialogRef = this.dialog.open(CreateRecipeContainerComponent, {
      data: { recipe: this.recipeInfo, isEdit: true }
    });
}

}
