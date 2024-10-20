import { Component, OnDestroy } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent implements OnDestroy{

  public countries: Country [] = [];
  public isLoading: boolean = false;
  private countrySubscription? : Subscription;

  constructor(
    private countryService: CountryService
  ) {

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
