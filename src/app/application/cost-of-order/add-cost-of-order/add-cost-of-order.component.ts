import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CostOfOrderService } from 'src/app/api-services/cost-of-order.service';
import { TravelOrderService } from 'src/app/api-services/travel-order.service';
import { CostOfOrderUpsert } from 'src/app/shared/model/cost-of-order-upsert';

@Component({
  selector: 'app-add-cost-of-order',
  templateUrl: './add-cost-of-order.component.html',
  styleUrls: ['./add-cost-of-order.component.css']
})
export class AddCostOfOrderComponent implements OnInit {

  constructor(private _costOfOrderService: CostOfOrderService, private _travelOrderService: TravelOrderService, private router: Router, private route: ActivatedRoute) { }

editMode = false;

costOfOrderId:number;

listOfTravelOrders=[];

@ViewChild('costOfOrderForm') public costOfOrderFrm: NgForm;

ngOnInit(): void {
this._travelOrderService.GetAll().subscribe(travelOrderdata=>{
this.listOfTravelOrders=travelOrderdata
})

if (this.route.snapshot.params['id']){
this.editMode = true;
this.costOfOrderId = this.route.snapshot.params['id'];

this.initForm();
}

}



onSubmit(){
var costOfOrder=new CostOfOrderUpsert(0,this.costOfOrderFrm.value.totalNumbersOfWages, this.costOfOrderFrm.value.priceOfWage, this.costOfOrderFrm.value.totalNumbersOfWagesDecimalBam,
                  this.costOfOrderFrm.value.salaryPerNight, 0, this.costOfOrderFrm.value.totalCost, 
                  this.costOfOrderFrm.value.numberOfKilometers, 0, this.costOfOrderFrm.value.totalFuelKilometersDecimalBam,
                  this.costOfOrderFrm.value.otherCostString, this.costOfOrderFrm.value.otherCostDecimal, this. costOfOrderFrm.value.totalCostFinish,
                  this.costOfOrderFrm.value.travelOrderId, this.costOfOrderFrm.value.totalWagesAndSalaryPerNight,this.costOfOrderFrm.value.transportOfficialCarBam,
                  this.costOfOrderFrm.value.totalTransportPrivateOfficialCar);

if (this.editMode){
  console.log(costOfOrder);
  this._costOfOrderService.Update(this.costOfOrderFrm.value.id, costOfOrder).subscribe(data=>{
    
    this.router.navigate(['app/travel-order']);
  })   
} 

else{ 
  this._costOfOrderService.Add(costOfOrder).subscribe(data=>{
    this.router.navigate(['app/travel-order']);
  })
}

}

private initForm(){
  this.costOfOrderFrm=new NgForm([],[]);
  this._costOfOrderService.GetByTravelOrderId(this.costOfOrderId).subscribe(costTravel=>{
      costTravel.forEach(element => {
        this._costOfOrderService.GetById(element.id).subscribe(cost=>{
            this.costOfOrderFrm.controls['totalNumbersOfWages'].setValue(cost.totalNumbersOfWages),
            this.costOfOrderFrm.controls['priceOfWage'].setValue(cost.priceOfWage),
            this.costOfOrderFrm.controls['totalNumbersOfWagesDecimalBam'].setValue(cost.totalNumbersOfWagesDecimalBam),
            this.costOfOrderFrm.controls['salaryPerNight'].setValue(cost.salaryPerNight),
            //this.costOfOrderFrm.controls['priceOfFuel'].setValue(cost.priceOfFuel),
             this.costOfOrderFrm.controls['totalCost'].setValue(cost.totalCost);
            this.costOfOrderFrm.controls['numberOfKilometers'].setValue(cost.numberOfKilometers);
            // this.costOfOrderFrm.controls['totalFuelKilometers'].setValue(o.totalFuelKilometers);
             this.costOfOrderFrm.controls['totalFuelKilometersDecimalBam'].setValue(cost.totalFuelKilometersDecimalBam);
             this.costOfOrderFrm.controls['otherCostString'].setValue(cost.otherCostString);
             this.costOfOrderFrm.controls['otherCostDecimal'].setValue(cost.otherCostDecimal);
             this.costOfOrderFrm.controls['totalCostFinish'].setValue(cost.totalCostFinish);
             this.costOfOrderFrm.controls['travelOrderId'].setValue(cost.travelOrderId);
             this.costOfOrderFrm.controls['id'].setValue(cost.id);
 
        })
      });
         
  })
  
  /*this.costOfOrderFrm=new NgForm([],[]);
  this._costOfOrderService.GetById(this.costOfOrderId).subscribe(o=>{
    console.log(o);

   

   // this.costOfOrderFrm.controls['totalNumbersOfWages'].setValue(o.totalNumbersOfWages),
    this.costOfOrderFrm.controls['priceOfWage'].setValue(o.priceOfWage),
   // this.costOfOrderFrm.controls['totalNumbersOfWagesDecimalBam'].setValue(o.totalNumbersOfWagesDecimalBam),
    this.costOfOrderFrm.controls['salaryPerNight'].setValue(o.salaryPerNight),
    this.costOfOrderFrm.controls['priceOfFuel'].setValue(o.priceOfFuel),
   // this.costOfOrderFrm.controls['totalCost'].setValue(o.totalCost);
    this.costOfOrderFrm.controls['numberOfKilometers'].setValue(o.numberOfKilometers);
   // this.costOfOrderFrm.controls['totalFuelKilometers'].setValue(o.totalFuelKilometers);
   // this.costOfOrderFrm.controls['totalFuelKilometersDecimalBam'].setValue(o.totalFuelKilometersDecimalBam);
   // this.costOfOrderFrm.controls['otherCostString'].setValue(o.otherCostString);
   // this.costOfOrderFrm.controls['otherCostDecimal'].setValue(o.otherCostDecimal);
   // this.costOfOrderFrm.controls['totalCostFinish'].setValue(o.totalCostFinish);
   // this.costOfOrderFrm.controls['travelOrderId'].setValue(o.travelOrderId);

});*/

}


}
