import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CostOfOrderService } from 'src/app/api-services/cost-of-order.service';
import { TravelOrderService } from 'src/app/api-services/travel-order.service';

@Component({
  selector: 'app-cost-of-order',
  templateUrl: './cost-of-order.component.html',
  styleUrls: ['./cost-of-order.component.css']
})
export class CostOfOrderComponent implements OnInit {

 
  constructor( private _costOfOrderService: CostOfOrderService, private _travelOrderService: TravelOrderService, private router: Router) { }

CostOfOrder=[];

ngOnInit(): void {
this.GetAll();
}

GetAll(){
  this._costOfOrderService.GetAll().subscribe(data=>{
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    this.CostOfOrder.push(data[i])
    this._travelOrderService.GetById(this.CostOfOrder[i].travelOrderId).subscribe(data=>{
        this.CostOfOrder[i].numberOfTravelOrder=data.numberOfOrder
      })
    }  
    console.log(data);

  });
}

}
