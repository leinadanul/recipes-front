import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertModule } from '@coreui/angular';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AlertModule, MatCardModule, MatIconModule, MatGridListModule,MatDialogModule,NgbModule],
  template: `<router-outlet/>`,
})
export class AppComponent {
  title = 'recipes-app';
}
