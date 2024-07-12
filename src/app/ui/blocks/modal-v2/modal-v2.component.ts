import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-modal-v2',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgIf
  ],
  templateUrl: './modal-v2.component.html',
  styleUrls: ['./modal-v2.component.css']
})
export class ModalV2Component {
  @Input() recipeInfo: any;
  @Output() deleteRecipeEvent = new EventEmitter<void>();
  @Output() editRecipeEvent = new EventEmitter<void>();
  @Output() saveRecipeEvent = new EventEmitter<any>();
  @Output() triggerFileInputEvent = new EventEmitter<any>();
  @Input() isLoading : boolean;
  @Input() recipeForm!: FormGroup;
  @Input() imagePreview: string | ArrayBuffer | null = null;
  @Output() onSubmit = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onFileSelected = new EventEmitter<Event>();
  @Output() addIngredientEvent = new EventEmitter<void>();
  @Output() removeIngredientEvent = new EventEmitter<number>();
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  isDisabled = true

  constructor(private dialogRef: MatDialogRef<ModalV2Component>) {}


  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient(): void {
    this.addIngredientEvent.emit();
  }

  triggerFileInput(): void {
    if (this.isEditing) {
      this.fileInput.nativeElement.click();
    }
  }

  removeIngredient(index: number): void {
    this.removeIngredientEvent.emit(index);
  }
  saveRecipe(): void {
    this.onSubmit.emit();
    this.isLoading = true;
    const minLoadingTime = 1000;
    const startTime = Date.now();

    setTimeout(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = minLoadingTime - elapsedTime;

      setTimeout(() => {
        this.isLoading = false;
        this.dialogRef.close();

      }, Math.max(remainingTime, 0));
    }, 1000);
  }

  cancelForm(): void {
    this.onCancel.emit();
  }

  isEditing = false;

  enableEditing(): void {
    this.isEditing = true;
    this.recipeForm.enable();
  }

  disableEditing(): void {
    this.isEditing = false;
    this.recipeForm.disable();
  }

  openDeleteConfirmation(): void {
    this.deleteRecipeEvent.emit();
  }
}
