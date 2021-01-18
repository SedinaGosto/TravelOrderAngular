import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application.component';
import { AuthGuard } from '../basic-auth/helpers/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
   path: 'app', component: ApplicationComponent, canActivate: [AuthGuard], children: [
  { path: '', redirectTo: '/app/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

]}]
@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
