import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/api-services/car.service';
import { EmployeeService } from 'src/app/api-services/employee.service';
import { LocationService } from 'src/app/api-services/location.service';
import { TravelOrderService } from 'src/app/api-services/travel-order.service';
import { Employee } from 'src/app/shared/model/employee';
import { Location } from 'src/app/shared/model/location';


@Component({
  selector: 'app-travel-order',
  templateUrl: './travel-order.component.html',
  styleUrls: ['./travel-order.component.css']
})
export class TravelOrderComponent implements OnInit {

  constructor( private _travelOrderService: TravelOrderService, private _employeeService: EmployeeService, 
              private _locationService: LocationService, private _carService: CarService, private router: Router) { }

  TravelOrder=[];

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
        this._carService.GetById(this.TravelOrder[i].carId).subscribe(t=>{
          this.TravelOrder[i].carName=t.name
        })
      }

    });
    }

}
