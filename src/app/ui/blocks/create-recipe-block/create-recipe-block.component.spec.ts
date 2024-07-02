import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecipeBlockComponent } from './create-recipe-block.component';

describe('CreateRecipeBlockComponent', () => {
  let component: CreateRecipeBlockComponent;
  let fixture: ComponentFixture<CreateRecipeBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRecipeBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRecipeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
