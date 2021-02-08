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
    //  this.TravelOrder[i].salaryPerNight=element.salaryPerNight;
      this.TravelOrder[i].priceOfWage=element.priceOfWage;
      this.TravelOrder[i].totalNumbersOfWages=element.totalNumbersOfWages;
    //  this.TravelOrder[i].salaryPerNight=element.salaryPerNight;
      this.TravelOrder[i].numberOfKilometers=element.numberOfKilometers;
      this.TravelOrder[i].totalNumbersOfWagesDecimalBam=element.totalNumbersOfWagesDecimalBam;
      this.TravelOrder[i].otherCostString=element.otherCostString;
      this.TravelOrder[i].otherCostDecimal=element.otherCostDecimal;
      this.TravelOrder[i].totalFuelKilometersDecimalBam=element.totalFuelKilometersDecimalBam;
    //  this.TravelOrder[i].totalFuelKilometers=element.totalFuelKilometers;
      this.TravelOrder[i].totalCostFinish=element.totalCostFinish;
      this.TravelOrder[i].totalCost=element.totalCost;
      this.TravelOrder[i].priceOfFuel=element.priceOfFuel;
    //  this.TravelOrder[i].totalWagesAndSalaryPerNight=element.totalWagesAndSalaryPerNight;    
    //this.TravelOrder[i].transportOfficialCarBam=element.transportOfficialCarBam;
      this.TravelOrder[i].totalTransportPrivateOfficialCar=element.totalTransportPrivateOfficialCar;       
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

