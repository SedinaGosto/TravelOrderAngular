import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from '../api-services/employee.service';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { LocationComponent } from './location/location.component';
import { LocationService } from '../api-services/location.service';
import { AddLocationComponent } from './location/add-location/add-location.component';
import { TravelOrderComponent } from './travel-order/travel-order.component';
import { AddTravelOrderComponent } from './travel-order/add-travel-order/add-travel-order.component';


import hr from '@angular/common/locales/hr';
import { registerLocaleData } from '@angular/common';
import { CostOfOrderComponent } from './cost-of-order/cost-of-order.component';
import { AddCostOfOrderComponent } from './cost-of-order/add-cost-of-order/add-cost-of-order.component';
import { CarComponent } from './car/car.component';
import { CarService } from '../api-services/car.service';
import { AddCarComponent } from './car/add-car/add-car.component';
import { TestComponent } from './test/test.component';
registerLocaleData(hr);


@NgModule({
  declarations: [
    ApplicationComponent,
    EmployeeComponent,
    HomeComponent,
    AddEmployeeComponent,
    LocationComponent,
    AddLocationComponent,
    CarComponent,
    AddCarComponent,
    TravelOrderComponent,
    AddTravelOrderComponent,
    CostOfOrderComponent,
    AddCostOfOrderComponent,
    TestComponent,
  ],
  imports: [
    CommonModule, 
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [EmployeeService, LocationService, CarService,
    { provide: LOCALE_ID, useValue: "hr-HR" },
  
  ],
  bootstrap: [ApplicationComponent]
})
export class ApplicationModule { }
