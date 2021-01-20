import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../api-services/authentication-service.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  constructor(private authservice: AuthenticationServiceService) { }

  ngOnInit(): void {
  }

  onLogout() {
      this.authservice.logout();
  }

}
