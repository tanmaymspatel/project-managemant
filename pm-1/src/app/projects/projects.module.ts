import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from "@angular/cdk/overlay";

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectContainerComponent } from './project-container/project-container.component';
import { ProjectPresentationComponent } from './project-container/project-presentation/project-presentation.component';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { DashboardPresentationComponent } from './Dashboard/dashboard-presentation/dashboard-presentation.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectService } from './services/project.service';
import { TaskContainerComponent } from './task-container/task-container.component';
import { TaskPresentationComponent } from './task-container/task-presentation/task-presentation.component';
import { ProjectFormPresentationComponent } from './project-container/project-presentation/project-form-presentation/project-form-presentation.component';
import { TaskFormPresentationComponent } from './task-container/task-presentation/task-form-presentation/task-form-presentation.component';
import { IdToNamePipe } from './pipes/id-to-name.pipe';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectContainerComponent,
    ProjectPresentationComponent,
    DashboardComponent,
    DashboardPresentationComponent,
    TaskContainerComponent,
    TaskPresentationComponent,
    ProjectFormPresentationComponent,
    TaskFormPresentationComponent,
    IdToNamePipe
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    OverlayModule
  ],
  exports: [
    ProjectPresentationComponent
  ],
  providers: [
    ProjectService
  ]
})
export class ProjectsModule { }
