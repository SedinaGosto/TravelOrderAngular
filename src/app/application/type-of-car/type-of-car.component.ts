import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypeOfCarService } from 'src/app/api-services/type-of-car.service';
import { TypeOfCar } from 'src/app/shared/model/type-of-car';

@Component({
  selector: 'app-type-of-car',
  templateUrl: './type-of-car.component.html',
  styleUrls: ['./type-of-car.component.css']
})
export class TypeOfCarComponent implements OnInit {
  constructor( private _typeOfCarService: TypeOfCarService, private router: Router) { }

  TypeOfCar=[];

  name= '';

  ngOnInit(): void {
    if(this.TypeOfCar.length>0){
      this.TypeOfCar=[];
    }
    this.GetAll();
  }


  GetAll():void{
    this._typeOfCarService.GetAll()
    .subscribe(data => {this.TypeOfCar = data
    console.log(data)});
  }

  delete(typeOfCar:TypeOfCar): void {
    this._typeOfCarService.Delete(typeOfCar.id).subscribe(typeOfCar => {
      this.ngOnInit();    
    });
  }

  searchByName(){
    this._typeOfCarService.GetByName(this.name)
      .subscribe(
        typeOfCar => {
          this.TypeOfCar = typeOfCar;
        },
        error => {
          console.log(error);
        });
  }

}
