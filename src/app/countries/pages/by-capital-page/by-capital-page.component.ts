import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent implements OnInit, OnDestroy{

  private countrySubscription? : Subscription;
  public countries: Country [] = [];
  public initialValue: string = '';
  public isLoading: boolean = false;

  constructor(
    private countryService: CountryService
  ) {

  }

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCapital.countries;
    this.initialValue = this.countryService.cacheStore.byCapital.term;
  }

  ngOnDestroy(): void {
    this.countrySubscription?.unsubscribe();
  }

  searchByCapital(term: string): void {
    this.isLoading = true;
    this.countrySubscription = this.countryService.searchCapital(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
