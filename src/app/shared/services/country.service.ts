import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'http://localhost:3000/countries';
  constructor(
    private http: HttpClient
  ) { }

  getCountries(): Observable<Country[]>{
    return this.http.get<Country[]>(this.apiUrl);
  }
}
