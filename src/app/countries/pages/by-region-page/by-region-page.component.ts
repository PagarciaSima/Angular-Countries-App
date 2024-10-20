import { Component, OnDestroy } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/countries.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent implements OnDestroy{

  public countries: Country [] = [];
  private countrySubscription?: Subscription;

  constructor(
    private countryService: CountryService
  ) {

  }
  ngOnDestroy(): void {
    this.countrySubscription?.unsubscribe();
  }

  searchByRegion(term: string): void {
    this.countrySubscription = this.countryService.searchRegion(term)
      .subscribe(countries => {
        this.countries = countries;
      });
  }
}
