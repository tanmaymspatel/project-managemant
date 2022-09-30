import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { ProjectContainerComponent } from './project-container/project-container.component';
import { TaskContainerComponent } from './task-container/task-container.component';
import { TeamContainerComponent } from './team-container/team-container.component';

const routes: Routes =
  [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
      path: 'home', component: ProjectContainerComponent,
      data: { title: "home" }
    },
    {
      path: ':id/dashboard', component: DashboardComponent,
      data: { title: "Dashboard" }

    },
    {
      path: ':id/tasks', component: TaskContainerComponent,
      data: { title: "Tasks" }

    },
    {
      path: ':id/team', component: TeamContainerComponent,
      data: { title: "Team" }

    }

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
