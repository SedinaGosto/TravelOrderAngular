import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from './api-services/authentication-service.service';
import { Admin } from './shared/model/admin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Admin;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationServiceService
) {
    this.authenticationService.user.subscribe(x => this.user = x);
}

logout() {
    this.authenticationService.logout();
}
}
