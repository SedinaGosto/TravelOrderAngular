import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicAuthComponent } from './basic-auth.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'account', component: BasicAuthComponent , children: 
  [
    { path: '', redirectTo: 'account/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
   
  ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicAuthRoutingModule { }