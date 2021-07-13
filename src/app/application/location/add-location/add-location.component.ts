import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/api-services/location.service';
import { LocationUpsert } from 'src/app/shared/model/location-upsert';
import { Location } from 'src/app/shared/model/location';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private _locationService:LocationService) { }

  editMode = false;

  @ViewChild('locationForm') public locationFrm: NgForm;
  locationId:number;
  
  ngOnInit(): void {
    if (this.route.snapshot.params['id']){
      this.editMode = true;
      this.locationId = this.route.snapshot.params['id'];     
      this.initForm();
    }
  }

  onSubmit(){
    if (!this.locationFrm.valid) 
    return;
    var location = new LocationUpsert(0,this.locationFrm.value.name, this.locationFrm.value.numberOfKilometers,false);
    console.log(location)
    if (this.editMode){
      this._locationService.Update(this.locationId, location).subscribe(data=>{
        this.router.navigate(['app/location']);
      })
    } 
    else{     
      this._locationService.Add(location).subscribe(data=>{
        this.router.navigate(['app/location']);
      })
    } 
  }

  private initForm(){
    this.locationFrm=new NgForm([],[]);
    this._locationService.GetById(this.locationId).subscribe(data=>{
      this.locationFrm.controls['name'].setValue(data.name);
      this.locationFrm.controls['numberOfKilometers'].setValue(data.numberOfKilometers);
     
    });
  }


}
