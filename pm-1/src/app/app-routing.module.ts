import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginContainerComponent } from './core/components/login/login-container.component';
import { MasterComponent } from './core/components/master/master.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ProjectFormPresentationComponent } from './projects/project-container/project-presentation/project-form-presentation/project-form-presentation.component';

const routes: Routes = [
  {
    path: "", component: MasterComponent,
    canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: '', redirectTo: 'projects', pathMatch: 'full',
      },
      {
        path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
      },
      {
        path: 'form', component: ProjectFormPresentationComponent
      }
    ]
  },
  {
    path: "login", component: LoginContainerComponent
  },
  // {
  //   path: "", redirectTo: "projects", pathMatch: "full"
  // },

  {
    path: '**', redirectTo: 'projects', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
