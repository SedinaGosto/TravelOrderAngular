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
import { TypeOfCarComponent } from './type-of-car/type-of-car.component';
import { AddTypeOfCarComponent } from './type-of-car/add-type-of-car/add-type-of-car.component';
import { TypeOfCarService } from '../api-services/type-of-car.service';
import { TravelOrderComponent } from './travel-order/travel-order.component';
import { AddTravelOrderComponent } from './travel-order/add-travel-order/add-travel-order.component';


import hr from '@angular/common/locales/hr';
import { registerLocaleData } from '@angular/common';
registerLocaleData(hr);


@NgModule({
  declarations: [
    ApplicationComponent,
    EmployeeComponent,
    HomeComponent,
    AddEmployeeComponent,
    LocationComponent,
    AddLocationComponent,
    TypeOfCarComponent,
    AddTypeOfCarComponent,
    TravelOrderComponent,
    AddTravelOrderComponent,
  ],
  imports: [
    CommonModule, 
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [EmployeeService, LocationService, TypeOfCarService,
    { provide: LOCALE_ID, useValue: "hr-HR" },
  
  ],
  bootstrap: [ApplicationComponent]
})
export class ApplicationModule { }
