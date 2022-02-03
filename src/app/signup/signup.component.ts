import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ValidatorService } from '../validator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  error: string;
  signupform: FormGroup;

  constructor(private router: Router, private validators: ValidatorService, private authService: AuthService) {
    this.error = '';
    this.signupform = new FormGroup({
      fullname: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      pwd: new FormGroup({
        password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
        confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      }, [this.validators.confirmPassword()])
    });
  }

  ngOnInit(): void {
  }

  isValid(constrolName: string, errorType: string): boolean {
    return this.signupform.get(constrolName)?.getError(errorType);
  }

  onSignup(): void {
    if(this.signupform.valid){
      const newUser = {
        fullname: this.signupform.value.fullname,
        email: this.signupform.value.email,
        password: this.signupform.value.pwd.confirmPassword
      };
      this.authService.signup(newUser).subscribe((response: any) => {
        console.log('Signup Response -> ', response);
        this.signupform.reset();
        this.authService.isLoggedIn.emit(newUser.fullname);
        sessionStorage.setItem("fullname",newUser.fullname);
        this.authService.setToken(response.data);
        this.router.navigate(['/home']);
      });
    }    
  }

  onSignin(): void {
    this.router.navigate(['/signin']);
  }

}
