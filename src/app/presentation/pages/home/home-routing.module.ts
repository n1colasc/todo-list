import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { TasksPage } from '../tasks/tasks.page';
import { AddTaskPage } from '../add-task/add-task.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'tasks',
    component: TasksPage
  },
  {
    path: 'add-task',
    component: AddTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
