import { CommonModule } from '@angular/common';
import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SearchableSelectComponent } from '../searchable-select/searchable-select.component';
import { Country } from '../../models/models';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NgxMaskDirective, provideNgxMask} from 'ngx-mask';
import { CountryService } from '../../services/country.service';
@Component({
  selector: 'international-phone-number',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SearchableSelectComponent,
    MatIconModule,
    NgxMaskDirective
  ],
  templateUrl: './international-phone-number.component.html',
  styleUrl: './international-phone-number.component.scss',
  providers: [
    provideNgxMask(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InternationalPhoneNumberComponent),
      multi: true
    }
  ]
})
export class InternationalPhoneNumberComponent  implements ControlValueAccessor, OnInit, OnDestroy {

  form: FormGroup = new FormGroup({
    country: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required])
  });

  selectedCountry: Country | null = null;
  disabled = false;
  private destroy$ = new Subject<void>();

  constructor(
    private countryService: CountryService
  ) {
  }

  countries: Country[] = [];

  ngOnInit() {
    this.countryService.getCountries().subscribe(
      {
        next: (value: Country[]) => {
          this.countries = [...value];
        }
      }
    );
    // Update phone validators when country changes
    this.form.get('country')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((country: Country) => {
        this.selectedCountry = country;
        
        // Update phone number validators
        this.form.get('phone')?.setValidators([
          Validators.required,
          // PhoneNumberValidators.createPhoneValidator(() => this.selectedCountry)
        ]);
        
        this.form.get('phone')?.updateValueAndValidity();
      });

    // Handle two-way binding
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (this.form.valid) {
          const phoneValue = `${this.selectedCountry?.code}${value.phone.replace(/\D/g, '')}`
          this.onChange(phoneValue);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private onChange: any = () => {};
  private onTouch: any = () => {};

  writeValue(value: any): void {
    if (value) {
      const country = value.country;
      if (country) {
        this.form.patchValue({
          country: country.code,
          phoneNumber: value.number
        }, { emitEvent: false });
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
  formatPhoneNumber() {
    if (!this.selectedCountry) return;

    const currentValue = this.form.get('phone')?.value;
    if (!currentValue) return;


    const digitsOnly = currentValue.replace(/\D/g, '');
    

    let formatted = this.selectedCountry.pattern;
    let digitIndex = 0;
    
    formatted = formatted.replace(/X/g, () => {
      return digitsOnly[digitIndex++] || '';
    });


    this.form.patchValue({
      phoneNumber: formatted.trim()
    }, { emitEvent: false });
  }

  trackByCountryCode(index: number, country: Country): string {
    return country.code;
  }

 
  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control?.errors) return '';

    if (control.hasError('required')) {
      return `${controlName === 'country' ? 'Country' : 'Phone number'} is required`;
    }

    if (control.hasError('invalidCountry')) {
      return 'Invalid country selected';
    }

    if (control.hasError('minLength')) {
      return `Phone number must be at least ${control.errors['minLength'].required} digits`;
    }

    if (control.hasError('maxLength')) {
      return `Phone number cannot be more than ${control.errors['maxLength'].required} digits`;
    }

    if (control.hasError('pattern')) {
      return `Invalid phone number format for selected country`;
    }

    return 'Invalid input';
  }
}


