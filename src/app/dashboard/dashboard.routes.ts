import { Routes } from '@angular/router';
import { Task } from './task/task';
import { TaskDetails } from './task/task-details/task-details';


export const routes: Routes = [
  // { path: 'tasks', component: Task ,
  //      children: [
  //     { path: ':id', component: TaskDetails }
  //   ]
  // }
   { path: 'tasks', component: Task },
  { path: 'tasks/:id', component: TaskDetails }
];
