import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/api-services/location.service';
import { Location } from 'src/app/shared/model/location';
import { LocationUpsert } from 'src/app/shared/model/location-upsert';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor( private _locationService: LocationService, private router: Router) { }

  Location=[];

  name= '';
  locationId:number;

  ngOnInit(): void {
    if(this.Location.length>0){
      this.Location=[];
    }
    this.GetAll();
  }


  GetAll():void{
    this._locationService.GetAll()
    .subscribe(data => {this.Location = data
    console.log(data)});
  }

  Delete(_locationId) {
    this.locationId = _locationId ; // **stored particular Id**
  }

  delete(){
    this._locationService.Delete(this.locationId).subscribe(data => {     
       this.ngOnInit();    
      })
  }


  searchByName(){
    this._locationService.GetByName(this.name)
      .subscribe(
        location => {
          this.Location = location;
        },
        error => {
          console.log(error);
        });
  }
  changeStatus(id,event){
    this.Location.forEach(element => {
      if(element.startLocation==true && event==true)
      {
        element.startLocation=false;
        var newLocation=new LocationUpsert(element.id,element.name,element.numberOfKilometers,false);
        console.log(newLocation)
        this._locationService.Update(element.id,newLocation).subscribe(data=>{
         console.log(data);
        })
      }
    });

  this.Location.forEach(element => {
    if(element.id==id && element.startLocation==false)
    {
      element.startLocation=event;
      var newLocation=new LocationUpsert(element.id,element.name,element.numberOfKilometers,element.startLocation);
      console.log(newLocation)
      this._locationService.Update(element.id,newLocation).subscribe(data=>{
       console.log(data);
      })
      
    }
  });
 

  }

}
