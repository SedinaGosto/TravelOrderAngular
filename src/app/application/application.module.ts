import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import { EmployeeComponent } from './employee/employee.component';



@NgModule({
  declarations: [ApplicationComponent, EmployeeComponent],
  imports: [
    CommonModule
  ]
})
export class ApplicationModule { }
