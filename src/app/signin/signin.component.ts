import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  error: string;
  @ViewChild('loginForm') loginForm?: NgForm;

  constructor(private router: Router, private authService: AuthService) {
    this.error = '';
  }

  ngOnInit(): void {
  }

  isValid(name: string, type: string): boolean {
    let status = false;

    if (this.loginForm && this.loginForm.controls[name] && this.loginForm.controls[name].errors && this.loginForm.controls[name].errors) {
      const errors: any = this.loginForm.controls[name].errors;
      return errors[type];
    }
    return status;
  }

  onLogin() {
    if (this.loginForm?.valid) {
      this.authService.signin(this.loginForm.value).subscribe((response: any) => {
        console.log('login response -> ', response);
        this.loginForm?.reset();
        this.authService.isLoggedIn.emit(response.data.fullname);
        sessionStorage.setItem("fullname",response.data.fullname);
        this.authService.setToken(response.data.token);
        this.router.navigate(['/home']);
      })
    }
  }

  onSignup() {
    this.router.navigate(['/signup']);
  }
  
}
