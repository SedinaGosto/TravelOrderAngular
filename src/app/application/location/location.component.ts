import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/api-services/location.service';
import { Location } from 'src/app/shared/model/location';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor( private _locationService: LocationService, private router: Router) { }

  Location=[];

  name= '';

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

  delete(location:Location): void {
    this._locationService.Delete(location.id).subscribe(location => {
      this.ngOnInit();    
    });
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

}
