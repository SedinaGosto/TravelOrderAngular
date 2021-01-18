import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthenticationServiceService } from 'src/app/api-services/authentication-service.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    
constructor(private authenticationService: AuthenticationServiceService, private router: Router) { }

intercept(req: HttpRequest<any>, next: HttpHandler, ): Observable<HttpEvent<any>> {
    // add header with basic auth credentials if user is logged in and request is to the api url
    var token = localStorage.getItem('token');
        if (token != null) {
            const clonedReq = req.clone({headers: req.headers.set('Authorization', 'Basic ' + token)});
            return next.handle(clonedReq).pipe(tap(
                succ => {
                    
                }, error => {
                    if (error.status == 401) {
                        localStorage.removeItem('token');
                        this.router.navigate(['/account/login']);
                    }
                }
            ));
        } else {
            return next.handle(req.clone());
        }
}
}