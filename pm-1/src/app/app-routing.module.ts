import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginContainerComponent } from './core/components/login/login-container.component';
import { MasterComponent } from './core/components/master/master.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RedirectGuard } from './core/guards/redirect.guard';

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
