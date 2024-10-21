import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Country } from '../models/models';

export class PhoneNumberValidators {

  static createPhoneValidator(country: Country): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!country || !control.value) return null;

      const phoneNumber = control.value.replace(/\D/g, '');
      const errors: ValidationErrors = {};

      if (phoneNumber.length < country.minLength) {
        errors['minLength'] = { 
          required: country.minLength, 
          actual: phoneNumber.length 
        };
      }
      
      if (phoneNumber.length > country.maxLength) {
        errors['maxLength'] = { 
          required: country.maxLength, 
          actual: phoneNumber.length 
        };
      }

      if (country.pattern && !new RegExp(country.pattern).test(phoneNumber)) {
        errors['pattern'] = { 
          required: country.pattern, 
          actual: phoneNumber 
        };
      }

      return Object.keys(errors).length ? errors : null;
    };
  }
}