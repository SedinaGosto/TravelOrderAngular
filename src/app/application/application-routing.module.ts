import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application.component';
import { AuthGuard } from '../basic-auth/helpers/auth.guard';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { LocationComponent } from './location/location.component';
import { AddLocationComponent } from './location/add-location/add-location.component';
import { TravelOrderComponent } from './travel-order/travel-order.component';
import { AddTravelOrderComponent } from './travel-order/add-travel-order/add-travel-order.component';
import { CostOfOrderComponent } from './cost-of-order/cost-of-order.component';
import { AddCostOfOrderComponent } from './cost-of-order/add-cost-of-order/add-cost-of-order.component';
import { CarComponent } from './car/car.component';
import { AddCarComponent } from './car/add-car/add-car.component';
import { TestComponent } from './test/test.component';
import { UpdateTravelOrderComponent } from './travel-order/update-travel-order/update-travel-order.component';

const routes: Routes = [
  {
   path: 'PDF/:startDate/:endDate', component: TestComponent}, 
  { path: 'app', component: ApplicationComponent, canActivate: [AuthGuard], children: [
  { path: '', redirectTo: '/app/employee', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'employee/add-employee', component: AddEmployeeComponent },
  { path: 'employee/add-employee/:id', component: AddEmployeeComponent },
  { path: 'location', component: LocationComponent },
  { path: 'location/add-location', component: AddLocationComponent },
  { path: 'location/add-location/:id', component: AddLocationComponent },
  { path: 'car', component: CarComponent },
  { path: 'car/add-car', component: AddCarComponent },
  { path: 'car/add-car/:id', component: AddCarComponent },
  { path: 'travel-order', component: TravelOrderComponent },
  { path: 'travel-order/add-travel-order', component: AddTravelOrderComponent },
  { path: 'travel-order/add-travel-order/:id', component: AddTravelOrderComponent },
  { path: 'cost-of-order', component: CostOfOrderComponent },
  { path: 'cost-of-order/add-cost-of-order', component: AddCostOfOrderComponent },
  { path: 'cost-of-order/add-cost-of-order/:id', component: AddCostOfOrderComponent },
  { path: 'test', component: TestComponent },
  { path: 'travel-order/update-travel-order/:id', component: UpdateTravelOrderComponent },



]}]
@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
