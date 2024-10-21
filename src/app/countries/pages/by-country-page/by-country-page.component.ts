import { Component, OnDestroy, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/countries.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent implements OnInit, OnDestroy{

  public countries: Country [] = [];
  public initialValue: string = '';
  private countrySubscription?: Subscription;
  public isLoading: boolean = false;

  constructor(
    private countryService: CountryService
  ) {

  }

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCountries.countries;
    this.initialValue = this.countryService.cacheStore.byCountries.term;
  }

  ngOnDestroy(): void {
    this.countrySubscription?.unsubscribe();
  }

  searchByCountry(term: string): void {
    this.isLoading = true;
    this.countrySubscription = this.countryService.searchCountry(term)
      .subscribe(countries => {
        this.isLoading = false;
        this.countries = countries;
      });
  }
}
