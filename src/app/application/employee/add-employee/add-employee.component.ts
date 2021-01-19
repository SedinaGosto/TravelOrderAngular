import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/api-services/employee.service';
import { EmployeeUpsert } from 'src/app/shared/model/employee-upsert';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private _employeeService:EmployeeService) { }

  editMode = false;

  @ViewChild('employeeForm') public employeeFrm: NgForm;
  employeeId:number;
  
  ngOnInit(): void {

    if (this.route.snapshot.params['id']){
      this.editMode = true;
      this.employeeId = this.route.snapshot.params['id'];
      
      this.initForm();
    }

  }


  onSubmit(){
    var employee = new EmployeeUpsert(0,this.employeeFrm.value.name, this.employeeFrm.value.surname, this. employeeFrm.value.typeOfWork);
    
    if (this.editMode){
      this._employeeService.Update(this.employeeId, employee).subscribe(data=>{
        this.router.navigate(['app/employee']);
      })
    
    } 
    else{     
      this._employeeService.Add(employee).subscribe(data=>{
        this.router.navigate(['app/employee']);
      })
    } 

  }

  private initForm(){
    this.employeeFrm=new NgForm([],[]);
    this._employeeService.GetById(this.employeeId).subscribe(o=>{
      this.employeeFrm.controls['name'].setValue(o.name),
      this.employeeFrm.controls['surname'].setValue(o.surname),
      this.employeeFrm.controls['typeOfWork'].setValue(o.typeOfWork);
    });
  }

}
