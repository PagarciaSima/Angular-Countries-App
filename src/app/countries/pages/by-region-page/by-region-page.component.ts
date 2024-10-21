import { Component, OnDestroy, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent implements OnInit, OnDestroy{

  public countries: Country [] = [];
  private countrySubscription?: Subscription;
  public regions: Region [] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public isLoading: boolean = false;

  constructor(
    private countryService: CountryService
  ) {

  }

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countryService.cacheStore.byRegion.region;
  }

  ngOnDestroy(): void {
    this.countrySubscription?.unsubscribe();
  }

  searchByRegion(region: Region): void {
    this.isLoading = true;
    this.selectedRegion = region;
    this.countrySubscription = this.countryService.searchRegion(region)
      .subscribe(countries => {
        this.isLoading = false;
        this.countries = countries;
      });
  }
}
