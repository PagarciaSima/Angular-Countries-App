import { Component, OnDestroy } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/countries.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent implements OnDestroy{

  public countries: Country [] = [];
  private countrySubscription?: Subscription;

  constructor(
    private countryService: CountryService
  ) {

  }
  ngOnDestroy(): void {
    this.countrySubscription?.unsubscribe();
  }

  searchByCountry(term: string): void {
    this.countrySubscription = this.countryService.searchCountry(term)
      .subscribe(countries => {
        this.countries = countries;
      });
  }
}
