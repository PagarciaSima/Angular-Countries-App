import { Component, OnDestroy } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/countries.service';
import { Subscription } from 'rxjs';

type Region = 'Africa'| 'Americas'| 'Asia'| 'Europe'| 'Oceania';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent implements OnDestroy{

  public countries: Country [] = [];
  private countrySubscription?: Subscription;
  public regions: Region [] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  constructor(
    private countryService: CountryService
  ) {

  }
  ngOnDestroy(): void {
    this.countrySubscription?.unsubscribe();
  }

  searchByRegion(region: Region): void {
    this.selectedRegion = region;
    this.countrySubscription = this.countryService.searchRegion(region)
      .subscribe(countries => {
        this.countries = countries;
      });
  }
}
