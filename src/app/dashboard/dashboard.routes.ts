import { Routes } from '@angular/router';
import { Task } from './task/task';
import { TaskDetails } from './task/task-details/task-details';
import { HcpHistorical } from './hcp-historical/hcp-historical';
import { PatientComponent } from './patient-component/patient-component';

export const routes: Routes = [
  {
    path: 'tasks',
    component: Task,
  },
    {
    path: 'hcp-historical',
    component: HcpHistorical,
  },

  {
    path:'patient',
    component:PatientComponent
  },
  { path: 'tasks/:id', component: TaskDetails },
];
