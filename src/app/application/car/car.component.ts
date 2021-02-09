import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/api-services/car.service';
import { Car } from 'src/app/shared/model/car';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  constructor( private _carService: CarService, private router: Router, private spinner: NgxSpinnerService) { }

  Car=[];

  carId:number;
  name= '';

  ngOnInit(): void {
    if(this.Car.length>0){
      this.Car=[];
    }
    this.GetAll();
  }


  GetAll():void{
    this.spinner.show();
    this._carService.GetAll()
    .subscribe(data => {this.Car = data
    console.log(data)    
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  Delete(_carId) {
    this.carId = _carId ; // **stored particular Id**
  }

  delete(){
    this._carService.Delete(this.carId).subscribe(data => {     
       this.ngOnInit();    
      })
  }

 

  searchByName(){
    this._carService.GetByName(this.name)
      .subscribe(
        car => {
          this.Car = car;
        },
        error => {
          console.log(error);
        });
  }

}
