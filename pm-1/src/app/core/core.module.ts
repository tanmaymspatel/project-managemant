import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/master/header/header.component';
import { MasterComponent } from './components/master/master.component';
import { SidebarComponent } from './components/master/sidebar/sidebar.component';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPresentationComponent } from './components/login/login-presentation/login-presentation.component';
import { LoginContainerComponent } from './components/login/login-container.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    MasterComponent,
    LoginPresentationComponent,
    LoginContainerComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    MasterComponent,
    LoginPresentationComponent,
    LoginContainerComponent
  ], 
  providers:[
    AuthService
  ]
})
export class CoreModule { }
