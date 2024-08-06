import { Routes } from '@angular/router';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { accessTokenGuard } from './dashboard/guards/access-token.guard';

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
    path:'dashboard',
    canActivate:[accessTokenGuard],
    loadChildren:() => import('./dashboard/dashboard.routes').then((x) => x.dashboardRoutes)
  },
  {
    path:'**',
    redirectTo:'home'
  }
];
