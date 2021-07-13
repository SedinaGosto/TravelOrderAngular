import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


import { CarService } from 'src/app/api-services/car.service';
import { CompanyService } from 'src/app/api-services/company.service';
import { CostOfOrderService } from 'src/app/api-services/cost-of-order.service';
import { EmployeeService } from 'src/app/api-services/employee.service';
import { LocationService } from 'src/app/api-services/location.service';
import { TravelOrderService } from 'src/app/api-services/travel-order.service';
declare  var jQuery:  any;

declare  var jQuery:  any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor( private _travelOrderService: TravelOrderService, private _employeeService: EmployeeService, private _costOfOrderService: CostOfOrderService,
    private _locationService: LocationService, private _carService: CarService, private _companyService: CompanyService, private router: Router,private activatedroute:ActivatedRoute) { }

TravelOrder=[];
counter: number
  length: number
  pdf: jsPDF
  startDate:Date
  endDate:Date




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

this._companyService.GetAll().subscribe(company=>{
  company.forEach(element=>{
    this.TravelOrder[i].name=element.name;
    this.TravelOrder[i].adress=element.adress;
    this.TravelOrder[i].city=element.city;
  }

  )
})

this._costOfOrderService.GetByTravelOrderId(this.TravelOrder[i].id).subscribe(c=>{
  c.forEach(element => {
    this.TravelOrder[i].salaryPerNight=element.salaryPerNight;
    this.TravelOrder[i].priceOfWage=element.priceOfWage;
    this.TravelOrder[i].priceOfFuel=element.priceOfFuel;
    this.TravelOrder[i].totalNumbersOfWages=element.totalNumbersOfWages;
    this.TravelOrder[i].salaryPerNight=element.salaryPerNight;
    this.TravelOrder[i].numberOfKilometers=element.numberOfKilometers;
    this.TravelOrder[i].totalNumbersOfWagesDecimalBam=element.totalNumbersOfWagesDecimalBam;
    this.TravelOrder[i].otherCostString=element.otherCostString;
    this.TravelOrder[i].otherCostDecimal=element.otherCostDecimal;
    this.TravelOrder[i].totalFuelKilometersDecimalBam=element.totalFuelKilometersDecimalBam;
    this.TravelOrder[i].totalFuelKilometers=element.totalFuelKilometers;
    this.TravelOrder[i].totalCostFinish=Math.abs(element.totalCostFinish);
    this.TravelOrder[i].totalCost=element.totalCost;
    this.TravelOrder[i].totalWagesAndSalaryPerNight=element.totalWagesAndSalaryPerNight;
    this.TravelOrder[i].transportOfficialCarBam=element.transportOfficialCarBam;
    this.TravelOrder[i].totalTransportPrivateOfficialCar=element.totalTransportPrivateOfficialCar;
    if(element.totalCostFinish<0)
    this.TravelOrder[i].IsMoneyReturn=true;  
    else    
    this.TravelOrder[i].IsMoneyReturn=false;  


  });
})
console.log(data);

}

});
}


/*generatePDF() {
  
  (function ($) {
    $(document).ready(function(){
    var HTML_Width = $(".canvas_div_pdf").width();
    var HTML_Height = $(".canvas_div_pdf").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width+(top_left_margin*2);
    var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    
    var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
    
  
    html2canvas($(".canvas_div_pdf")[0],{allowTaint:true}).then(function(canvas) {
      canvas.getContext('2d');
      
      console.log(canvas.height+"  "+canvas.width);
      
      
      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF('p','mm',  [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
      
      
      for (var i = 1; i <= totalPDFPages; i++) { 
        pdf.addPage([PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
      }
      
        pdf.save("HTML-Document.pdf");
      });
    })
  })(jQuery);
  }*/
}



