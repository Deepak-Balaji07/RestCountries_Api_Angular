import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  searchByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/name/${name}`);
  }

  searchByCapital(capital: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/capital/${capital}`);
  }

  getCountryByCode(code: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/alpha/${code}`);
  }
  searchByCode(code: string) {
    return this.http.get(`https://restcountries.com/v3.1/alpha/${code}`);
  }
}
