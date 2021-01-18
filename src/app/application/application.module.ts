import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [ApplicationComponent, EmployeeComponent,HomeComponent],
  imports: [
    CommonModule, RouterModule,BrowserModule
  ]
})
export class ApplicationModule { }
