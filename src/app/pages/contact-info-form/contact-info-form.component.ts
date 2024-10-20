import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InternationalPhoneNumberComponent } from '../../shared/ui-components/international-phone-number/international-phone-number.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { SearchableSelectComponent } from '../../shared/ui-components/searchable-select/searchable-select.component';
import { CountryService } from '../../shared/services/country.service';
import { Country } from '../../shared/models/models';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-contact-info-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    InternationalPhoneNumberComponent,
    SearchableSelectComponent,
    AsyncPipe
  ],
  templateUrl: './contact-info-form.component.html',
  styleUrl: './contact-info-form.component.scss'
})
export class ContactInfoFormComponent implements OnInit {

  contactForm: FormGroup = new FormGroup({
    // name: new FormControl(),
    phoneNumber: new FormControl(),
    // message: new FormControl(),
  })


  constructor(
    private countryService: CountryService
  ) {
  }

  countries: Country[] = [];

  ngOnInit(): void {
    // this.countryService.getCountries().subscribe(
    //   {
    //     next: (value: Country[]) => {
    //       console.log(value)
    //       this.countries = [...value];
    //     }
    //   }
    // );
    
  }

  onSave(){

  }

  onReset(){
    this.contactForm.reset();
  }
}
