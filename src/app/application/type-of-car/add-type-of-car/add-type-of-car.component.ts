import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeOfCarService } from 'src/app/api-services/type-of-car.service';
import { TypeOfCarUpsert } from 'src/app/shared/model/type-of-car-upsert';

@Component({
  selector: 'app-add-type-of-car',
  templateUrl: './add-type-of-car.component.html',
  styleUrls: ['./add-type-of-car.component.css']
})
export class AddTypeOfCarComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private _typeOfCarService:TypeOfCarService) { }

  editMode = false;

  @ViewChild('typeOfCarForm') public typeOfCarFrm: NgForm;
  typeOfCarId:number;
  
  ngOnInit(): void {

    if (this.route.snapshot.params['id']){
      this.editMode = true;
      this.typeOfCarId = this.route.snapshot.params['id'];
      
      this.initForm();
    }

  }


  onSubmit(){
    var typeOfCar = new TypeOfCarUpsert(0,this.typeOfCarFrm.value.name);
    
    if (this.editMode){
      this._typeOfCarService.Update(this.typeOfCarId, typeOfCar).subscribe(data=>{
        this.router.navigate(['app/type-of-car']);
      })
    
    } 
    else{     
      this._typeOfCarService.Add(typeOfCar).subscribe(data=>{
        this.router.navigate(['app/type-of-car']);
      })
    } 

  }

  private initForm(){
    this.typeOfCarFrm=new NgForm([],[]);
    this._typeOfCarService.GetById(this.typeOfCarId).subscribe(data=>{
      this.typeOfCarFrm.controls['name'].setValue(data.name);
     
    });
  }


}
