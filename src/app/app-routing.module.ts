import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './application/home/home.component';
import { BasicAuthComponent } from './basic-auth/basic-auth.component';
import { AuthGuard } from './basic-auth/helpers/auth.guard';
import { LoginComponent } from './basic-auth/login/login.component';


const routes: Routes = [

  /*{ path: '', component: HomeComponent ,canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
     { path: '**', redirectTo: '' }
  */
 {
    path: 'account', component: BasicAuthComponent, children: [
      { path: '', redirectTo: '/account/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
    ]
  },


  

  // otherwise redirect to home
 

  { path: '', redirectTo: '/app/travel-order', pathMatch: 'full' },
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

