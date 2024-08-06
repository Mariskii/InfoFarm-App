import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { PlantationsPageComponent } from './pages/plantations-page/plantations-page.component';


export const dashboardRoutes: Routes = [
  {
    path:'',
    component:DashboardPageComponent,
    children: [
      {path:'plantations',component:PlantationsPageComponent},
      {path:'**',redirectTo:'plantations'},
    ]
  },
];
