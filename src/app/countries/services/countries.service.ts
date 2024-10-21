import { CacheStore } from '../interfaces/cache-store.interface';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountryService {

  private apiUrl = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital:   {term: '', countries: []},
    byCountries: {term: '', countries: []},
    byRegion:    {region: '', countries: []}
  }

  constructor(
    private httpClient: HttpClient
  ) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    const data = localStorage.getItem('cacheStore');
    if (!data) return;

    try {
      const parsedData = JSON.parse(data);
      // Valida que tenga la estructura esperada
      if (parsedData && typeof parsedData === 'object') {
        this.cacheStore = parsedData;
      }
    } catch (error) {
      console.error('Error al parsear localStorage data:', error);
      // limpia datos corruptos
      localStorage.removeItem('cacheStore');
    }
  }


  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError( () => of([])),
      delay( 2000 ),
    );
  }

  searchCountryByAlphaCode( code: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(
        map (countries => countries.length > 0 ? countries[0] : null),
        catchError( () => of(null))
      );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCapital = { term, countries }),
        tap( () => this.saveToLocalStorage()),
      );
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCountries = { term, countries }),
        tap( () => this.saveToLocalStorage()),
      );
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byRegion = { region, countries }),
        tap( () => this.saveToLocalStorage()),
      );
  }
}
