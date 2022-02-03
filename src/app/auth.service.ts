import { HttpBackend, HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import * as props from './backend-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: EventEmitter<any>;
  showPopup: EventEmitter<{ title: string, message: string}>;
  private httpClient: HttpClient;
  token: any | undefined;

  constructor(private httpBackend: HttpBackend, private router: Router) {
    this.isLoggedIn = new EventEmitter();
    this.showPopup = new EventEmitter();
    this.httpClient = new HttpClient(this.httpBackend);
  }

  signup(user: any) {
    return this.httpClient.post<any>(props.URL + '/auth/signup', user).pipe(
      catchError((error, caught) => {
        console.log('catchError', error);
        if (error && error.error && error.error.error && error.error.error.length > 0) {
          this.showPopup.emit({title: "System Error", message: error.error.error});
        } else {
          this.showPopup.emit({title: "System Error", message: "Network Issue."});
        }
        return of(error);
      }) as any
    );
  }

  signin(user: any) {
    return this.httpClient.post<any>(props.URL + '/auth/signin', user).pipe(
      catchError((error, caught) => {
        console.log('catchError', error);
        if (error && error.error && error.error.error && error.error.error.length > 0) {
          this.showPopup.emit({title: "System Error", message: error.error.error});
        } else {
          this.showPopup.emit({title: "System Error", message: "Network Issue."});
        }
        return of(error);
      }) as any
    );
  }

  logout() {
    sessionStorage.removeItem('fullname');
    sessionStorage.removeItem('token');
    this.token = undefined;
    this.isLoggedIn.emit('');
    this.router.navigate(['/home']);
  }

  setToken(token: string) {
    if (token) {
      this.token = token;
      sessionStorage.setItem('token', token);
    }
  }

  getToken() {
    if (this.token) {
      return this.token;
    }
    return sessionStorage.getItem('token');
  }

  validateToken() {
    return this.token || sessionStorage.getItem('token');
  } 

}
