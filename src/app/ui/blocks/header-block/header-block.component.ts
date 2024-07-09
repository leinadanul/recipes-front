import { Component, HostListener, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-header-block',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatIconModule, MatMenuModule, NgIf],
  templateUrl: './header-block.component.html',
  styleUrls: ['./header-block.component.css']
})
export class HeaderBlockComponent {
  @Input() isMenuOpen: boolean;
  @Input() isHeaderHidden: boolean
  @Input() displayValue: string;
  @Input() menu: string;
  @Input() openMenu: () => void;
  @Input() closeMenu: () => void;
  @Input() createRecipe: () => void;
}
