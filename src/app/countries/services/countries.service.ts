import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountryService {

  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

  searchCountryByAlphaCode( code: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(
        catchError( error => {
          console.log({error});
          return of([])
        })
      );
  }

  searchCapital(term: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/capital/${term}`)
      .pipe(
        catchError( error => {
          console.log({error});
          return of([])
        })
      );
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/name/${term}`)
      .pipe(
        catchError( error => {
          console.log({error});
          return of([])
        })
      );
  }

  searchRegion(term: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/region/${term}`)
    .pipe(
      catchError( error => {
        console.log({error});
        return of([])
      })
    );
  }
}
