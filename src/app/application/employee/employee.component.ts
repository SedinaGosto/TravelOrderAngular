import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/api-services/employee.service';
import { Employee } from 'src/app/shared/model/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

 
  constructor( private _employeeService: EmployeeService, private router: Router) { }

  employee=[];
  name= '';
 

  ngOnInit(): void {
    if(this.employee.length>0){
      this.employee=[];
    }
    this.GetAll();
  }

  GetAll():void{
    this._employeeService.GetAll()
    .subscribe(data => {this.employee = data
    console.log(data)});
  }

  delete(employee:Employee): void {
    this._employeeService.Delete(employee.id).subscribe(employee => {
      this.ngOnInit();    
    });
  }

  searchByName(){
    this._employeeService.GetByName(this.name)
      .subscribe(
        employee => {
          console.log(employee);
          this.employee = employee;
        },
        error => {
          console.log(error);
        });
  }

}
