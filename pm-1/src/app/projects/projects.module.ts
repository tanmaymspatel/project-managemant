import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectContainerComponent } from './project-container/project-container.component';
import { ProjectPresentationComponent } from './project-container/project-presentation/project-presentation.component';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { DashboardPresentationComponent } from './Dashboard/dashboard-presentation/dashboard-presentation.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectContainerComponent,
    ProjectPresentationComponent,
    DashboardComponent,
    DashboardPresentationComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ],
  exports:[
    ProjectPresentationComponent
  ]
})
export class ProjectsModule { }
