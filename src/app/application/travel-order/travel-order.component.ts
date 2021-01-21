import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/api-services/employee.service';
import { LocationService } from 'src/app/api-services/location.service';
import { TravelOrderService } from 'src/app/api-services/travel-order.service';
import { TypeOfCarService } from 'src/app/api-services/type-of-car.service';
import { Employee } from 'src/app/shared/model/employee';
import { Location } from 'src/app/shared/model/location';
import { TypeOfCar } from 'src/app/shared/model/type-of-car';


@Component({
  selector: 'app-travel-order',
  templateUrl: './travel-order.component.html',
  styleUrls: ['./travel-order.component.css']
})
export class TravelOrderComponent implements OnInit {

  constructor( private _travelOrderService: TravelOrderService, private _employeeService: EmployeeService, 
              private _locationService: LocationService, private _typeOfCarService: TypeOfCarService, private router: Router) { }

  TravelOrder=[];
  numberOfOrder:number;
  reasonOfTravel:string;
  descriptionOfTravel:string;
  daysOfTravel: number;
  advancePayment: number;
  advancePaymentString: string;
  restOfAdvancePayment: number;
  totalHours: string;
  startDate: Date;
  endDate: Date;
  totalDaysOfTravel:number

  location= new Location;
  locationName:string;
  employeeName:string;
  typeOfCarName:string;

  employee= new Employee;
  typeOfCar= new TypeOfCar;

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll(){
    this._travelOrderService.GetAll().subscribe(data=>{
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.TravelOrder.push(data[i])
        this._locationService.GetById(this.TravelOrder[i].locationId).subscribe(l=>{
          this.TravelOrder[i].locationName=l.name
        })
        this._employeeService.GetById(this.TravelOrder[i].employeeId).subscribe(e=>{
          this.TravelOrder[i].employeeName=e.name
        })
        this._typeOfCarService.GetById(this.TravelOrder[i].typeOfCarId).subscribe(t=>{
          this.TravelOrder[i].typeOfCarName=t.name
        })
      }

    });
    }

}
