import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationServiceService } from '../api-services/authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //loginFrm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationServiceService
  ) { 
      // redirect to home if already logged in
      if (this.authenticationService.adminValue) { 
          this.router.navigate(['/']);
      }
  }

  @ViewChild('loginForm') public loginFrm: NgForm;

  ngOnInit() {
    /*  this.loginFrm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
*/
      // get return url from route parameters or default to '/'
      //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginFrm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginFrm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)       
          .subscribe(
              data => {
                  this.router.navigate(['app/employee']);;
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
  }
}