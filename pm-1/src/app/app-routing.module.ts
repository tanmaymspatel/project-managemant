import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { MasterComponent } from './core/components/master/master.component';

const routes: Routes = [
  {
    path:"projects", component:MasterComponent
  },
  {
    path:"login", component:LoginComponent
  },
  {
    path:"", redirectTo:"login", pathMatch:"full"
  },
  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
