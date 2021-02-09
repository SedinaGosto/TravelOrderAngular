import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/api-services/car.service';
import { EmployeeService } from 'src/app/api-services/employee.service';
import { LocationService } from 'src/app/api-services/location.service';
import { TravelOrderService } from 'src/app/api-services/travel-order.service';
import { Employee } from 'src/app/shared/model/employee';
import { Location } from 'src/app/shared/model/location';
import { TravelOrder } from 'src/app/shared/model/travel-order';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-travel-order',
  templateUrl: './travel-order.component.html',
  styleUrls: ['./travel-order.component.css']
})
export class TravelOrderComponent implements OnInit {

  constructor( private _travelOrderService: TravelOrderService, private _employeeService: EmployeeService, 
              private _locationService: LocationService, private _carService: CarService, private router: Router, private spinner: NgxSpinnerService) { }

  TravelOrder=[];

  startDate:Date;
  endDate:Date;

  travelOrderId:number;

  ngOnInit(): void {
    if(this.TravelOrder.length>0){
      this.TravelOrder=[];
    }
    this.GetAll();
  }


  GetAll(){
    this.spinner.show();

    this._travelOrderService.GetAll().subscribe(data=>{
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.TravelOrder.push(data[i])
        this._locationService.GetById(this.TravelOrder[i].locationId).subscribe(l=>{
          this.TravelOrder[i].locationName=l.name
        })
        this._locationService.GetById(this.TravelOrder[i].locationStartId).subscribe(sl=>{
          this.TravelOrder[i].startLocation=sl.name
        })
        this._employeeService.GetById(this.TravelOrder[i].employeeId).subscribe(e=>{
          this.TravelOrder[i].employeeName=e.name +" "+ e.surname
        })
        this._carService.GetById(this.TravelOrder[i].carId).subscribe(t=>{
          this.TravelOrder[i].carName=t.name
        })
      }
      
     
    });
     setTimeout(() => {
      this.spinner.hide();
    }, 5000);
    }

  GetAllByDate(){
    this.spinner.show();

    this._travelOrderService.GetByDate(this.startDate,this.endDate).subscribe(data=>{
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.TravelOrder.push(data[i])
        this._locationService.GetById(this.TravelOrder[i].locationId).subscribe(l=>{
          this.TravelOrder[i].locationName=l.name
        })
        this._locationService.GetById(this.TravelOrder[i].locationStartId).subscribe(sl=>{
          this.TravelOrder[i].startLocation=sl.name
        })
        this._employeeService.GetById(this.TravelOrder[i].employeeId).subscribe(e=>{
          this.TravelOrder[i].employeeName=e.name +" "+ e.surname
        })
        this._carService.GetById(this.TravelOrder[i].carId).subscribe(t=>{
          this.TravelOrder[i].carName=t.name
        })
      }
      
     
    });
     setTimeout(() => {
      this.spinner.hide();
    }, 3000);
    }

    redirect(){
      this.router.navigate(['/PDF',{startDate:this.startDate, endDate:this.endDate}]);
    }
 
    Delete(_travelOrderId) {
      this.travelOrderId = _travelOrderId ; // **stored particular Id**
    }
  
    delete(){
      this._travelOrderService.Delete(this.travelOrderId).subscribe(data => {     
         this.ngOnInit();    
        })
    }


    Init()
    {
      if(this.TravelOrder.length>0){
        this.TravelOrder=[];
      }
      if(this.endDate!=undefined)
      this.GetAllByDate();
  
    }
  
}
