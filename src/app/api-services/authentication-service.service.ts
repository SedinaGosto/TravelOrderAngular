import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../shared/model/admin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private userSubject: BehaviorSubject<Admin>;
  public user: Observable<Admin>;
    readonly url = environment.baseUrl + "/admin"
  constructor(
      private router: Router,
      private http: HttpClient
  ) {
      this.userSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('user')));
      this.user = this.userSubject.asObservable();
  }

  public get userValue(): Admin {
      return this.userSubject.value;
  }

  login() {
      return this.http.get<any>(this.url)
        
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('token');
      this.userSubject.next(null);
      this.router.navigate(['/account/login']);
  }
}
