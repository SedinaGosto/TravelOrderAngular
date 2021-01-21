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
                  this.costOfOrderFrm.value.salaryPerNight, this.costOfOrderFrm.value.priceOfFuel, this.costOfOrderFrm.value.totalCost, 
                  this.costOfOrderFrm.value.numberOfKilometers, this.costOfOrderFrm.value.totalFuelKilometers, this.costOfOrderFrm.value.totalFuelKilometersDecimalBam,
                  this.costOfOrderFrm.value.otherCostString, this.costOfOrderFrm.value.otherCostDecimal, this. costOfOrderFrm.value.totalCostFinish,
                  this.costOfOrderFrm.value.travelOrderId);

if (this.editMode){
  this._costOfOrderService.Update(this.costOfOrderId, costOfOrder).subscribe(data=>{
    this.router.navigate(['app/cost-of-order']);
  })   
} 

else{ 
  this._costOfOrderService.Add(costOfOrder).subscribe(data=>{
    this.router.navigate(['app/cost-of-order']);
  })
}

}

private initForm(){
  this.costOfOrderFrm=new NgForm([],[]);
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

});

}


}
