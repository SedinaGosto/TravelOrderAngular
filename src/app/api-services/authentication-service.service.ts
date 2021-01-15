import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../shared/model/admin';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private adminSubject: BehaviorSubject<Admin>;
    public admin: Observable<Admin>;
    public list: Observable<Admin[]>;
    
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.adminSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('admin')));
        this.admin = this.adminSubject.asObservable();
    }

    public get adminValue(): Admin {
        return this.adminSubject.value;
    }



    login(username: string, password: string):Observable<Admin[]> {

      const basicAuth = username + ':' + password;
      let Headers = new HttpHeaders();
      Headers = Headers.append('Authorization', 'Basic ' + btoa(basicAuth));


        this.http.get<any>(`${environment.baseUrl}/admin`, {headers:Headers})
            .subscribe(admin => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                admin.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('admin', JSON.stringify(admin));
                this.adminSubject.next(admin);
                this.list=admin;
                return this.list;
            });
           return this.list;
          
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('admin');
        this.adminSubject.next(null);
        this.router.navigate(['/login']);
    }
}
