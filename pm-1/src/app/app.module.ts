import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/guards/auth.guard';
import { RedirectGuard } from './core/guards/redirect.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    CoreModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard, 
    RedirectGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
