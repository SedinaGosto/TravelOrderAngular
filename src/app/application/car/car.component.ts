import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/api-services/car.service';
import { Car } from 'src/app/shared/model/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  constructor( private _carService: CarService, private router: Router) { }

  Car=[];

  name= '';

  ngOnInit(): void {
    if(this.Car.length>0){
      this.Car=[];
    }
    this.GetAll();
  }


  GetAll():void{
    this._carService.GetAll()
    .subscribe(data => {this.Car = data
    console.log(data)});
  }

  delete(car:Car): void {
    this._carService.Delete(car.id).subscribe(car => {
      this.ngOnInit();    
    });
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
