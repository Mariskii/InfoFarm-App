import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

export const authRoutes: Routes = [
  {
    path:'',
    component:LayoutPageComponent,
    children: [
      {path:'login',component:LoginPageComponent},
      {path:'**',redirectTo:'login'},
    ]
  },
];
