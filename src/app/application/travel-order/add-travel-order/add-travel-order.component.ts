import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { equal } from 'assert';
import { EmployeeService } from 'src/app/api-services/employee.service';
import { LocationService } from 'src/app/api-services/location.service';
import { TravelOrderService } from 'src/app/api-services/travel-order.service';
import { TypeOfCarService } from 'src/app/api-services/type-of-car.service';
import { TravelOrderUpsert } from 'src/app/shared/model/travel-order-upsert';

@Component({
  selector: 'app-add-travel-order',
  templateUrl: './add-travel-order.component.html',
  styleUrls: ['./add-travel-order.component.css']
})
export class AddTravelOrderComponent implements OnInit {

 
  constructor(private _travelOrderService: TravelOrderService, private _employeeService: EmployeeService, private _locationService: LocationService, 
              private _typeOfCarService: TypeOfCarService, private router: Router, private route: ActivatedRoute) { }

  editMode = false;

  tavelOrderId:number;
 
  listOfEmployees=[];
  listOfLocations=[];
  listOfTypeOfCars=[];

  @ViewChild('travelOrderForm') public travelOrderFrm: NgForm;

  ngOnInit(): void {
    this._employeeService.GetAll().subscribe(employeesData=>{
      this.listOfEmployees=employeesData
    })
    this._locationService.GetAll().subscribe(locationsData=>{
      this.listOfLocations=locationsData
    })
    this._typeOfCarService.GetAll().subscribe(typeOfCarsData=>{
      this.listOfTypeOfCars=typeOfCarsData
    })
     
  
    if (this.route.snapshot.params['id']){
      this.editMode = true;
      this.tavelOrderId = this.route.snapshot.params['id'];
      
      this.initForm();
    }

  }


  
  onSubmit(){
    var travelOrder=new TravelOrderUpsert(0,this.travelOrderFrm.value.numberOfOrder, this.travelOrderFrm.value.reasonOfTravel, this.travelOrderFrm.value.descriptionOfTravel,
                            this.travelOrderFrm.value.daysOfTravel, this.travelOrderFrm.value.advancePayment, this.travelOrderFrm.value.advancePaymentString, 
                            this.travelOrderFrm.value.restOfAdvancePayment, this.travelOrderFrm.value.totalHours, this.travelOrderFrm.value.startDate,
                            this.travelOrderFrm.value.endDate, this.travelOrderFrm.value.totalDaysOfTravel, this. travelOrderFrm.value.locationId,
                            this.travelOrderFrm.value.employeeId, this.travelOrderFrm.value.typeOfCarId);

    if (this.editMode){
      this._travelOrderService.Update(this.tavelOrderId, travelOrder).subscribe(data=>{
        this.router.navigate(['app/travel-order']);
      })   
    } 

    else{ 
    this._travelOrderService.Add(travelOrder).subscribe(data=>{
      this.router.navigate(['app/travel-order']);
    })
  }

  }

  private initForm(){
    this.travelOrderFrm=new NgForm([],[]);
    this._travelOrderService.GetById(this.tavelOrderId).subscribe(o=>{
    console.log(o);
      
    //  this.travelOrderFrm.controls['numberOfOrder'].setValue(o.numberOfOrder),
      this.travelOrderFrm.controls['reasonOfTravel'].setValue(o.reasonOfTravel),
      this.travelOrderFrm.controls['descriptionOfTravel'].setValue(o.descriptionOfTravel),
      this.travelOrderFrm.controls['daysOfTravel'].setValue(o.daysOfTravel),
      this.travelOrderFrm.controls['advancePayment'].setValue(o.advancePayment),
    // this.travelOrderFrm.controls['advancePaymentString'].setValue(o.advancePaymentString);
      this.travelOrderFrm.controls['restOfAdvancePayment'].setValue(o.restOfAdvancePayment);
    //  this.travelOrderFrm.controls['totalHours'].setValue(o.totalHours);
      this.travelOrderFrm.controls['startDate'].setValue(o.startDate);
      this.travelOrderFrm.controls['endDate'].setValue(o.endDate);
    //  this.travelOrderFrm.controls['totalDaysOfTravel'].setValue(o.totalDaysOfTravel);
      this.travelOrderFrm.controls['locationId'].setValue(o.locationId);
      this.travelOrderFrm.controls['employeeId'].setValue(o.employeeId);
      this.travelOrderFrm.controls['typeOfCarId'].setValue(o.typeOfCarId);
    
    });
    
  }


}
