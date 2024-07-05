import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderBlockComponent } from '../../ui/blocks/header-block/header-block.component';
import { HeaderContainerFacade } from './header-container.facade';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CreateRecipeContainerComponent } from '../create-recipe-container/create-recipe-container.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header-container',
  standalone: true,
  imports: [HeaderBlockComponent, AsyncPipe, MatToolbarModule, MatIconModule, MatMenuModule],
  templateUrl: './header-container.component.html',
})
export class HeaderContainerComponent implements OnInit, OnDestroy {
  public isMenuOpen: boolean = false;
  public displayValue = "flex";
  public menu: string = 'header__menu header__menu--hidden'

  constructor(
    private readonly facade: HeaderContainerFacade,
    public dialog: MatDialog,

  ) {}

  ngOnDestroy(): void {
    this.facade.destroySubscription();
  }
  ngOnInit(): void {
    this.facade.initSubcristion();
  }

  openMenu = (): void => {
    this.isMenuOpen = true
    this.displayValue = "flex"
    this.menu = "header__menu";
  }

  closeMenu = (): void => {
    this.isMenuOpen = false
    this.menu = 'header__menu header__menu--hidden';
  }

  createRecipe = (): void => {
    this.dialog.open(CreateRecipeContainerComponent, {
      width: '80vw',
      height: '80vh',
      data: {
        recipe: {
          name: '',
          description: '',
          ingredients: [],
          preparationTime: null,
          imageUrl: '',
          instructions: '',
          recipeType: ''
        },
        isEdit: false
      }
    });
  }
}
