import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-block',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-block.component.html',
  styleUrl: './header-block.component.css'
})
export class HeaderBlockComponent {
  @Input() isMenuOpen: boolean;
  @Input() displayValue : string;
  @Input() menu: string;
  @Input() openMenu : ()=>void;
  @Input() closeMenu :()=>void;

}
