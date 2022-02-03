import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authService.getToken();

    const header = {
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }

    const request = req.clone({
      setHeaders: header
    })

    return next.handle(request).pipe(
      catchError((error, caught) => {
        console.log(error);
        console.log('catchError', error);
        if (error.status == 403) {
          this.authService.showPopup.emit({title: "System Error", message: "Session got expired!"});
        } else {
          this.authService.showPopup.emit({title: "System Error", message: "Network Issue."});
        }
        return of(error);
      }) as any
    );
  }

}
