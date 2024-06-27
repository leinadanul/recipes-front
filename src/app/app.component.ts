import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertModule } from '@coreui/angular';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AlertModule, MatCardModule, MatIconModule],
  template: `<router-outlet/>`,
})
export class AppComponent {
  title = 'recipes-app';
}
