import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderContainerComponent } from '../container/header-container/header-container.component';
import { MainLayoutComponent } from '../ui/layouts/main-layout/main-layout.component';
import { PrivateGuard } from './private.guard';
import { FooterContainerComponent } from '../container/footer-container/footer-container.component';
import { CarouselContainerComponent } from '../container/carousel-container/carousel-container.component';
import { CategoryContainerComponent } from '../container/category-container/category-container.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    //canActivate: [PrivateGuard],
    children: [
      { path: '', component: HeaderContainerComponent, outlet: 'header' },
      { path: '', component: CarouselContainerComponent, outlet: 'slides' },
      {path: '', component: CategoryContainerComponent, outlet: 'category' },
      { path: '', component: FooterContainerComponent, outlet: 'footer' },
    ],
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
