import { Injectable, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { } 

  public confirmPassword(): ValidatorFn {    
    return (formgrp: AbstractControl): ValidationErrors | null => {
      if(formgrp.get('confirmPassword')?.pristine) {
        return null;
      }        
      if (!formgrp.get('confirmPassword')?.value) {
        return null;
      }

      if (formgrp.get('password')?.value === formgrp.get('confirmPassword')?.value) { // valid
        return null;
      } else {
        return { confirmPwd: { valid: false } };
      }
    };
  }

  public isNull(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      if(control?.pristine) {
        return null;
      }
      if (!control.value) {
        return null;
      }

      if (control.value == null || control.value == 'null') { // invalid
        return { isNull: { valid: false } };        
      } else { // valid
        return null;
      }
    };
  }

}
