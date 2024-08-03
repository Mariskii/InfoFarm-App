import { Routes } from '@angular/router';
import { HomePageComponent } from './home/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path:'home',
    component:HomePageComponent
  },
  {
    path:'user',
    loadChildren:() => import('./auth/auth.routes').then((x) => x.authRoutes)
  },
  {
    path:'**',
    redirectTo:'home'
  }
];
