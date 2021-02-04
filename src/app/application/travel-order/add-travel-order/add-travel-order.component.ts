import { getLocaleDateTimeFormat } from '@angular/common';
import { Identifiers } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { equal } from 'assert';
import { of } from 'rxjs';
import { CarService } from 'src/app/api-services/car.service';
import { CostOfOrderService } from 'src/app/api-services/cost-of-order.service';
import { EmployeeService } from 'src/app/api-services/employee.service';
import { LocationService } from 'src/app/api-services/location.service';
import { TravelOrderService } from 'src/app/api-services/travel-order.service';
import { CostOfOrderUpsert } from 'src/app/shared/model/cost-of-order-upsert';
import { Employee } from 'src/app/shared/model/employee';
import { Location } from 'src/app/shared/model/location';
import { TravelOrderUpsert } from 'src/app/shared/model/travel-order-upsert';

@Component({
  selector: 'app-add-travel-order',
  templateUrl: './add-travel-order.component.html',
  styleUrls: ['./add-travel-order.component.css']
})
export class AddTravelOrderComponent implements OnInit {

 
  constructor(private _travelOrderService: TravelOrderService,private _costOfOrderService: CostOfOrderService, private _employeeService: EmployeeService, private _locationService: LocationService, 
              private _carService: CarService, private router: Router, private route: ActivatedRoute) { }

  editMode = false;
  fromClientID: number;
  fromLocationMondayID: number;
  fromLocationTuesdayID: number;
  fromLocationWednesdayID: number;
  fromLocationThursdayID: number;
  fromLocationFridayID: number;
  fromCarMondayID: number;
  fromCarTuesdayID: number;
  fromCarWednesdayID: number;
  fromCarThursdayID: number;
  fromCarFridayID: number;
  tavelOrderId:number;
  current=Date.now();
 
  listOfEmployees=[];
  listOfLocations=[];
  listOfTypeOfCars=[];
  travelorder=[];
  checkEmployee=false;
  startLocation:string;
startLocationId:number;
 


uniquenumber:string;
numberofOrder:string;
employee:Employee;



  @ViewChild('travelOrderForm') public travelOrderFrm: NgForm;

  ngOnInit(): void {
    this._employeeService.GetAll().subscribe(employeesData=>{
      this.listOfEmployees=employeesData
    })
    this._locationService.GetAll().subscribe(locationsData=>{
      this.listOfLocations=locationsData
    })
    this._carService.GetAll().subscribe(typeOfCarsData=>{
      this.listOfTypeOfCars=typeOfCarsData
    })
    this._locationService.GetStartLocation(true).subscribe(location=>{
      location.forEach(element => {
     this.startLocation=element.name;
     this.startLocationId=element.id
     this.travelOrderFrm.controls['startLocation'].setValue(element.name);
     this.travelOrderFrm.controls['startLocationId'].setValue(element.id.toString());

   });


    })
     
  
    if (this.route.snapshot.params['id']){
      this.editMode = true;
      this.tavelOrderId = this.route.snapshot.params['id'];
      
      this.initForm();
    }

  }


   onSubmit(){
    if(!this.travelOrderFrm.valid) 
    return;
  
     let date = new Date(this.travelOrderFrm.value.endDate);
     let currentDate = new Date(this.travelOrderFrm.value.startDate);
     var ModifayDate = new Date(this.travelOrderFrm.value.startDate);
     var id=this.travelOrderFrm.value.employeeId;
     var travellength=0;
    

     var travelOrder;
    
    
     var brojac=1;
     this._travelOrderService.GetByEmployee(id).subscribe(travel => {

     while (ModifayDate <= date) {
       console.log(this.travelOrderFrm.value.startLocationId)
       if (ModifayDate.getDay() != 0 && ModifayDate.getDay() != 6) {
         switch (ModifayDate.getDay()) {
           case 1:

             if(this.travelOrderFrm.value.locationMondayId != "" && this.travelOrderFrm.value.locationMondayId != undefined){
              travelOrder = new TravelOrderUpsert(0, "", this.travelOrderFrm.value.reasonOfTravel, this.travelOrderFrm.value.descriptionOfTravel,
              this.travelOrderFrm.value.daysOfTravel, this.travelOrderFrm.value.advancePayment, this.travelOrderFrm.value.advancePaymentString,
               this.travelOrderFrm.value.totalHours, ModifayDate,
              ModifayDate, this.travelOrderFrm.value.totalDaysOfTravel, this.travelOrderFrm.value.locationMondayId,
              this.travelOrderFrm.value.employeeId, this.travelOrderFrm.value.typeOfCarMondayId,this.travelOrderFrm.value.startLocationId);
             }
             else{
               travelOrder = null;
             }
          
            
             break;
           case 2:
            if(this.travelOrderFrm.value.locationTuesdayId != "" && this.travelOrderFrm.value.locationTuesdayId != undefined){
              travelOrder=new TravelOrderUpsert(0,"", this.travelOrderFrm.value.reasonOfTravel, this.travelOrderFrm.value.descriptionOfTravel,
              this.travelOrderFrm.value.daysOfTravel, this.travelOrderFrm.value.advancePayment, this.travelOrderFrm.value.advancePaymentString, 
               this.travelOrderFrm.value.totalHours, ModifayDate,
              ModifayDate, this.travelOrderFrm.value.totalDaysOfTravel, this.travelOrderFrm.value.locationTuesdayId,
              this.travelOrderFrm.value.employeeId, this.travelOrderFrm.value.typeOfCarTuesdayId,this.travelOrderFrm.value.startLocationId);
            }
            else{
              travelOrder = null;
            }
          
             break;

          case 3:
            if(this.travelOrderFrm.value.locationWednesdayId != "" && this.travelOrderFrm.value.locationWednesdayId != undefined){
              travelOrder=new TravelOrderUpsert(0," ", this.travelOrderFrm.value.reasonOfTravel, this.travelOrderFrm.value.descriptionOfTravel,
              this.travelOrderFrm.value.daysOfTravel, this.travelOrderFrm.value.advancePayment, this.travelOrderFrm.value.advancePaymentString, 
               this.travelOrderFrm.value.totalHours, ModifayDate,
              ModifayDate, this.travelOrderFrm.value.totalDaysOfTravel, this.travelOrderFrm.value.locationWednesdayId,
              this.travelOrderFrm.value.employeeId, this.travelOrderFrm.value.typeOfCarWednesdayId,this.travelOrderFrm.value.startLocationId);
            }
            else{
              travelOrder = null
            }
            break;
          case 4:
            if(this.travelOrderFrm.value.locationThursdayId != "" && this.travelOrderFrm.value.locationThursdayId != undefined){
              travelOrder=new TravelOrderUpsert(0,"", this.travelOrderFrm.value.reasonOfTravel, this.travelOrderFrm.value.descriptionOfTravel,
              this.travelOrderFrm.value.daysOfTravel, this.travelOrderFrm.value.advancePayment, this.travelOrderFrm.value.advancePaymentString, 
              this.travelOrderFrm.value.totalHours, ModifayDate,
              ModifayDate, this.travelOrderFrm.value.totalDaysOfTravel, this.travelOrderFrm.value.locationThursdayId,
              this.travelOrderFrm.value.employeeId, this.travelOrderFrm.value.typeOfCarThursdayId,this.travelOrderFrm.value.startLocationId);
            }
           
            else{
              travelOrder = null;
            }
            break;
           default:
            if(this.travelOrderFrm.value.locationFridayId != "" && this.travelOrderFrm.value.locationFridayId != undefined){
              travelOrder=new TravelOrderUpsert(0,"", this.travelOrderFrm.value.reasonOfTravel, this.travelOrderFrm.value.descriptionOfTravel,
            this.travelOrderFrm.value.daysOfTravel, this.travelOrderFrm.value.advancePayment, this.travelOrderFrm.value.advancePaymentString, 
             this.travelOrderFrm.value.totalHours, ModifayDate,
            ModifayDate, this.travelOrderFrm.value.totalDaysOfTravel, this.travelOrderFrm.value.locationFridayId,
            this.travelOrderFrm.value.employeeId, this.travelOrderFrm.value.typeOfCarFridayId,this.travelOrderFrm.value.startLocationId);
            }
            else{
              travelOrder = null
            }
            
             break;
         }
        

           if (travellength == 0) {
             travellength = travel.length;
           }
           if(travelOrder){
            travelOrder.numberOfOrder = ((brojac++) + travellength) + "/" + ModifayDate.getFullYear()
            console.log(travelOrder)
            this._travelOrderService.Add(travelOrder).subscribe(data => {
          
              var costoforde=new CostOfOrderUpsert(0,0,0,0,0,0,0,0,0,0,"",0,0,data.id,0,0,0);
               this._costOfOrderService.Add(costoforde).subscribe(cost=>{
                 console.log(cost);
                 this.router.navigate(['app/travel-order']);
            })
           })
          }
           

          }
          ModifayDate= new Date(ModifayDate.setDate(ModifayDate.getDate() + 1))
        }
      })

  


 // this.router.navigate(['app/travel-order']);
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
    //  this.travelOrderFrm.controls['totalHours'].setValue(o.totalHours);
      this.travelOrderFrm.controls['startDate'].setValue(o.startDate);
      this.travelOrderFrm.controls['endDate'].setValue(o.endDate);
    //  this.travelOrderFrm.controls['totalDaysOfTravel'].setValue(o.totalDaysOfTravel);
      this.travelOrderFrm.controls['locationId'].setValue(o.locationId);
      this.travelOrderFrm.controls['employeeId'].setValue(o.employeeId);
      this.travelOrderFrm.controls['carId'].setValue(o.carId);
    
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
  }

}
