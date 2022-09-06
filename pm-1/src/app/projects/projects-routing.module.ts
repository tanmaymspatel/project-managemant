import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { ProjectContainerComponent } from './project-container/project-container.component';

const routes: Routes =
  [
    { path: '', redirectTo: 'projects', pathMatch: 'full' },
    {
      path: 'projects', component: ProjectContainerComponent
    },
    {
      path: 'dashboard', component: DashboardComponent
    }

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
