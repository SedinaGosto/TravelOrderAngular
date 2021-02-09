import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/api-services/car.service';
import { CompanyService } from 'src/app/api-services/company.service';
import { CostOfOrderService } from 'src/app/api-services/cost-of-order.service';
import { EmployeeService } from 'src/app/api-services/employee.service';
import { LocationService } from 'src/app/api-services/location.service';
import { TravelOrderService } from 'src/app/api-services/travel-order.service';

@Component({
  selector: 'app-recapitulation-pdf',
  templateUrl: './recapitulation-pdf.component.html',
  styleUrls: ['./recapitulation-pdf.component.css']
})
export class RecapitulationPDFComponent implements OnInit {

  constructor( private _travelOrderService: TravelOrderService, private _employeeService: EmployeeService, private _companyService: CompanyService,
    private _locationService: LocationService, private _carService: CarService, private _costOfOrderService: CostOfOrderService, private router: Router, private activatedroute: ActivatedRoute) { }

TravelOrder=[];

companyName:string;
adress:string;
city:string;

totalWagesDecimal=0;
totalKilometers=0;
totalTransport=0;
totalOtherCost=0;
totalCost=0;
totalAdvancePayment=0;
totalReturnMoney=0;
totalPayOffMoney=0;

startDate:Date;
endDate:Date; 

ngOnInit(): void {
  this.GetAll();
   
  }
  
  GetAll(){
    this.startDate = this.activatedroute.snapshot.params["startDate"];
    this.endDate = this.activatedroute.snapshot.params["endDate"];
  
    this._travelOrderService.GetByDate(this.startDate,this.endDate).subscribe(data=>{
    console.log(data);
    for (let i = 0; i < data.length; i++) {  
      this.TravelOrder.push(data[i])
      this._travelOrderService.GetById(this.TravelOrder[i].id).subscribe(to=>{
        this.totalAdvancePayment+=to.advancePayment;
      })

      this._locationService.GetById(this.TravelOrder[i].locationId).subscribe(l=>{
        this.TravelOrder[i].locationName=l.name;
      })
      this._locationService.GetById(this.TravelOrder[i].locationStartId).subscribe(sl=>{
        this.TravelOrder[i].startLocation=sl.name;
      })
      this._employeeService.GetById(this.TravelOrder[i].employeeId).subscribe(e=>{
        this.TravelOrder[i].employeeName=e.name+ " "+e.surname;
        this.TravelOrder[i].typeofWork=e.typeOfWork;  
      })
      this._carService.GetById(this.TravelOrder[i].carId).subscribe(t=>{
      this.TravelOrder[i].carName=t.name;
      this.TravelOrder[i].privateCar=t.privateCar;
      this.TravelOrder[i].officialCar=t.officialCar;
      })
  
      
   
        
      this._costOfOrderService.GetByTravelOrderId(this.TravelOrder[i].id).subscribe(c=>{
          c.forEach(element => {
      this.TravelOrder[i].priceOfWage=element.priceOfWage;
      this.TravelOrder[i].totalNumbersOfWages=element.totalNumbersOfWages;
      this.TravelOrder[i].numberOfKilometers=element.numberOfKilometers;
      this.TravelOrder[i].totalNumbersOfWagesDecimalBam=element.totalNumbersOfWagesDecimalBam;
      this.TravelOrder[i].otherCostString=element.otherCostString;
      this.TravelOrder[i].otherCostDecimal=element.otherCostDecimal;
      this.TravelOrder[i].totalFuelKilometersDecimalBam=element.totalFuelKilometersDecimalBam;
      this.TravelOrder[i].totalCostFinish=element.totalCostFinish;
      this.TravelOrder[i].totalCost=element.totalCost;
      this.TravelOrder[i].priceOfFuel=element.priceOfFuel;
      this.TravelOrder[i].totalTransportPrivateOfficialCar=element.totalTransportPrivateOfficialCar;   

      this.totalWagesDecimal+= element.totalNumbersOfWagesDecimalBam
      this.totalKilometers+= element.numberOfKilometers
      this.totalTransport+= element.totalTransportPrivateOfficialCar
      this.totalOtherCost+= element.otherCostDecimal
      this.totalCost+= element.totalCost
      
      if(element.totalCostFinish<0){
        this.TravelOrder[i].returnMoney=Math.abs(element.totalCostFinish);  
        this.TravelOrder[i].payOffMoney=0;
      }
      else  {  
        this.TravelOrder[i].payOffMoney=Math.abs(element.totalCostFinish);
        this.TravelOrder[i].returnMoney=0; 
      }

      this.totalPayOffMoney+=this.TravelOrder[i].payOffMoney;
      this.totalReturnMoney+= this.TravelOrder[i].returnMoney;

    
      
    });
  })
  console.log(data);
  this._companyService.GetAll().subscribe(company=>{
    company.forEach(element=>{
      this.companyName=element.name;
      this.adress=element.adress;
      this.city=element.city;
   })
 
  })


  }
  
  });
  }

}

