import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/api-services/car.service';
import { CarUpsert } from 'src/app/shared/model/car-upsert';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private _carService:CarService) { }

  editMode = false;

  @ViewChild('carForm') public carFrm: NgForm;
  carId:number;
  
  private:boolean;
  official:boolean=true;

  _typeOfCar:string;
  
  ngOnInit(): void {

    if (this.route.snapshot.params['id']){
      this.editMode = true;
      this.carId = this.route.snapshot.params['id'];
      
      this.initForm();
    }

  }


  onSubmit(){
    var car = new CarUpsert(0,this.carFrm.value.name, this.carFrm.value.model, this.carFrm.value.numberOfRegistration, this.private, this.official);
    
    if (this.editMode){
      this._carService.Update(this.carId, car).subscribe(data=>{
        this.router.navigate(['app/car']);
      })
    
    } 
    else{     
      this._carService.Add(car).subscribe(data=>{
        this.router.navigate(['app/car']);
      })
    } 

  }

  private initForm(){
    this.carFrm=new NgForm([],[]);
    this._carService.GetById(this.carId).subscribe(data=>{
      this.carFrm.controls['name'].setValue(data.name);
      this.carFrm.controls['model'].setValue(data.model);
      this.carFrm.controls['numberOfRegistration'].setValue(data.numberOfRegistration);
      if(data.officialCar){
        this._typeOfCar="officialCar"
      }
      else{
        this._typeOfCar="privateCar"
      }
      this.carFrm.controls['_typeOfCar'].setValue(this._typeOfCar);

     
    });
  }


  public onClick(item){
    if(item=='privatno'){
      this.private=true;
      this.official=false;
    }
    else{
      this.private=false;
      this.official=true;
    }
  }


}
