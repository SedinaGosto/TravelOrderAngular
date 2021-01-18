import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { BasicAuthComponent } from './basic-auth.component';
import { BasicAuthRoutingModule } from './basic-auth-routing.module';
import { ApplicationModule } from '../application/application.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
        BasicAuthComponent,
        LoginComponent,
       
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BasicAuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ]
})

export class BasicAuthModule {
}