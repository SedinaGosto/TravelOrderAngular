import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/api-services/car.service';
import { CostOfOrderService } from 'src/app/api-services/cost-of-order.service';
import { EmployeeService } from 'src/app/api-services/employee.service';
import { LocationService } from 'src/app/api-services/location.service';
import { TravelOrderService } from 'src/app/api-services/travel-order.service';
import { CostOfOrder } from 'src/app/shared/model/cost-of-order';
import { CostOfOrderUpsert } from 'src/app/shared/model/cost-of-order-upsert';
import { TravelOrderUpsert } from 'src/app/shared/model/travel-order-upsert';

@Component({
  selector: 'app-update-travel-order',
  templateUrl: './update-travel-order.component.html',
  styleUrls: ['./update-travel-order.component.css']
})
export class UpdateTravelOrderComponent implements OnInit {
  constructor(private _travelOrderService: TravelOrderService, private _employeeService: EmployeeService, private _locationService: LocationService, 
    private _carService: CarService, private _costOfOrderService: CostOfOrderService, private router: Router, private route: ActivatedRoute) { }

  editMode = false;

 EmployeeId:number
 LocationId:number
 CarId:number
  listOfLocations=[];
  listOfTypeOfCars=[];
  travelorder=[];
  travelOrderId:number;
  checkEmployee=false;
  checkEndDate=false;
  

  
  @ViewChild('travelOrderForm') public travelOrderFrm: NgForm;
  
  ngOnInit(): void {

  
    this._locationService.GetAll().subscribe(locationsData=>{
      this.listOfLocations=locationsData
    })
    this._carService.GetAll().subscribe(typeOfCarsData=>{
      this.listOfTypeOfCars=typeOfCarsData
    })
     

    if (this.route.snapshot.params['id']){
      this.editMode = true;
      this.travelOrderId = this.route.snapshot.params['id'];
      
      this.initForm();
    }
  
  }
  
  
  
  onSubmit(){

    if (!this.travelOrderFrm.valid) 
    return;
      var travelOrder=new TravelOrderUpsert(0,this.travelOrderFrm.value.numberOfOrder, this.travelOrderFrm.value.reasonOfTravel, this.travelOrderFrm.value.descriptionOfTravel,
        this.travelOrderFrm.value.daysOfTravel, this.travelOrderFrm.value.advancePayment, this.travelOrderFrm.value.advancePaymentString, 
        this.travelOrderFrm.value.totalHours,  this.travelOrderFrm.value.startDate,
        this.travelOrderFrm.value.endDate, this.travelOrderFrm.value.totalDaysOfTravel, Number(this.travelOrderFrm.value.locationId),
        Number(this.travelOrderFrm.value.employeeId), Number(this.travelOrderFrm.value.carId),Number(this.travelOrderFrm.value.startLocationId));
  
    if (this.editMode){
      console.log(travelOrder);
      this._travelOrderService.Update(this.travelOrderId, travelOrder).subscribe(data=>{
        this._costOfOrderService.GetByTravelOrderId(this.travelOrderId).subscribe(costOfOrder=>{
          costOfOrder.forEach(element => {
              this._costOfOrderService.Update(element.id,element).subscribe(test=>{
                console.log( test);
              });
          });
        })
      this.router.navigate(['app/travel-order']);
    })   
  } 
  
  }
  
  private initForm(){
    this.travelOrderFrm=new NgForm([],[]);
    this._travelOrderService.GetById(this.travelOrderId).subscribe(o=>{
      this._employeeService.GetById(o.employeeId).subscribe(e=>{
        this._locationService.GetById(o.locationStartId).subscribe(l=>{

        console.log(o);
        console.log(e);
      
        this.travelOrderFrm.controls['numberOfOrder'].setValue(o.numberOfOrder),
          this.travelOrderFrm.controls['reasonOfTravel'].setValue(o.reasonOfTravel),
          this.travelOrderFrm.controls['descriptionOfTravel'].setValue(o.descriptionOfTravel),
          this.travelOrderFrm.controls['advancePayment'].setValue(o.advancePayment),     
          this.travelOrderFrm.controls['startDate'].setValue(o.startDate);
          this.travelOrderFrm.controls['endDate'].setValue(o.endDate);
          this.travelOrderFrm.controls['locationId'].setValue(o.locationId);
          this.travelOrderFrm.controls['employeeId'].setValue(o.employeeId);
          this.travelOrderFrm.controls['employee'].setValue(e.name+ " "+e.surname);
          this.travelOrderFrm.controls['startLocation'].setValue(l.name);
          this.travelOrderFrm.controls['startLocationId'].setValue(l.id);
          this.travelOrderFrm.controls['carId'].setValue(o.carId);

        })
      })
   
    
    });
  
  }
  
  CheckEmployee(){
    
    if(this.travelOrderFrm.value.employeeId!=undefined && this.travelOrderFrm.value.startDate!="" && this.travelOrderFrm.value.endDate!="")
    {
 
    this._travelOrderService.GetByEmployeeAndDate(this.travelOrderFrm.value.employeeId,this.travelOrderFrm.value.startDate,this.travelOrderFrm.value.endDate).subscribe(data=>{

      if(data.length>0)
      {
        this.checkEmployee=true;
      }
      else{
        this.checkEmployee=false;

      }
    }) 
  }
  if(this.travelOrderFrm.value.startDate>= this.travelOrderFrm.value.endDate){
    this.checkEndDate=true;
  }
  else{
    this.checkEndDate=false;
  }
  }
}
