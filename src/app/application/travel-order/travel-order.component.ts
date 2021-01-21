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
      data.forEach(travelOrder=>{
          this._locationService.GetById(travelOrder.locationId).subscribe(data=>{
            this.locationName=data.name;       

          this._employeeService.GetById(travelOrder.employeeId).subscribe(data=>{
            this.employeeName=data.name;  

          this._typeOfCarService.GetById(travelOrder.typeOfCarId).subscribe(data=>{
            this.typeOfCarName=data.name;                 
          
         this.TravelOrder.push({id:travelOrder.id, numberOfOrder:travelOrder.numberOfOrder, reasonOfTravel:travelOrder.reasonOfTravel,
                                descriptionOfTravel:travelOrder.descriptionOfTravel, daysOfTravel:travelOrder.daysOfTravel, advancePayment:travelOrder.advancePayment,
                                advancePaymentStringnt:travelOrder.advancePaymentString, restOfAdvancePayment:travelOrder.restOfAdvancePayment, totalHours:travelOrder.totalHours,
                                startDate:travelOrder.startDate, endDate:travelOrder.endDate, totalDaysOfTravel:travelOrder.totalDaysOfTravel,
                                employeeId:travelOrder.employeeId, locationId:travelOrder.locationId, typeOfCar:travelOrder.typeOfCarId, 
                                locationName:this.locationName, employeeName:this.employeeName, typeOfCarName:this.typeOfCarName})     
      })})})})
      console.log(this.TravelOrder );

    });
    }

}
