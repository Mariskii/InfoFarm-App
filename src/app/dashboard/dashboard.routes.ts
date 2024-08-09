import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { PlantationsPageComponent } from './pages/plantations-page/plantations-page.component';
import { CropsPageComponent } from './pages/crops-page/crops-page.component';
import { PlantationExpandedPageComponent } from './pages/plantation-expanded-page/plantation-expanded-page.component';


export const dashboardRoutes: Routes = [
  {
    path:'',
    component:DashboardPageComponent,
    children: [
      {path:'plantations',component:PlantationsPageComponent},
      {path:'plantation/:plantationId',component:PlantationExpandedPageComponent},
      {path:'crops',component:CropsPageComponent},
      {path:'**',redirectTo:'plantations'},
    ]
  },
];
