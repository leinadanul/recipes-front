import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertModule } from '@coreui/angular';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AlertModule],
  template: `<router-outlet/>`,
})
export class AppComponent {
  title = 'recipes-app';
}
