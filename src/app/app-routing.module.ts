import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  { path: '', component: HomeComponent ,canActivate: [AuthGuard] },
 /* {
    path: 'account', component: AuthComponent, children: [
      { path: '', redirectTo: '/account/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
    ]
  },*/
  { path: 'login', component: LoginComponent },
  

  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

