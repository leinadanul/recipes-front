import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@Component({
  selector: 'app-create-recipe-block',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './create-recipe-block.component.html',
  styleUrls: ['./create-recipe-block.component.css']
})
export class CreateRecipeBlockComponent {
  @Input() isLoading : boolean;
  @Input() recipeForm!: FormGroup;
  @Input() imagePreview: string | ArrayBuffer | null = null;
  @Output() onSubmit = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onFileSelected = new EventEmitter<Event>();
  @Output() addIngredientEvent = new EventEmitter<void>();
  @Output() removeIngredientEvent = new EventEmitter<number>();

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient(): void {
    this.addIngredientEvent.emit();
  }

  removeIngredient(index: number): void {
    this.removeIngredientEvent.emit(index);
  }

  submitForm(): void {
    this.onSubmit.emit();
  }

  cancelForm(): void {
    this.onCancel.emit();
  }
}
