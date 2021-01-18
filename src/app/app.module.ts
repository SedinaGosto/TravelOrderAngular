import { ApplicationModule, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthenticationServiceService } from './api-services/authentication-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HomeComponent } from './application/home/home.component';
import { LoginComponent } from './basic-auth/login/login.component';
import { BasicAuthInterceptor } from './basic-auth/helpers/basic-auth.interceptor';
import { BasicAuthComponent } from './basic-auth/basic-auth.component';
import { BasicAuthRoutingModule } from './basic-auth/basic-auth-routing.module';
import { BasicAuthModule } from './basic-auth/basic-auth.module';
import { ApplicationRoutingModule } from './application/application-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    BasicAuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BasicAuthModule,
    ApplicationRoutingModule,
    ApplicationModule, RouterModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    

    AuthenticationServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
