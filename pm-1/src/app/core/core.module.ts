import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/master/header/header.component';
import { MasterComponent } from './components/master/master.component';
import { SidebarComponent } from './components/master/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    MasterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    MasterComponent,
    LoginComponent
  ], 
  providers:[
    AuthService
  ]
})
export class CoreModule { }
