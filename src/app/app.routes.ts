import { Routes } from '@angular/router';
import { HcpLogin } from './hcp-login/hcp-login';
import { Dashboard } from './dashboard/dashboard';
import { hcpAuthGuard } from './hcp-auth-guard';
import { PatientComponent } from './dashboard/patient-component/patient-component';

export const routes: Routes = [
  { path: 'hcp-login', component: HcpLogin },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [hcpAuthGuard],
    loadChildren: () => import('./dashboard/dashboard.routes').then((m) => m.routes),
  },
  
  {
    path:'patient',
    component:PatientComponent
  },
  { path: '', redirectTo: 'hcp-login', pathMatch: 'full' },
];
