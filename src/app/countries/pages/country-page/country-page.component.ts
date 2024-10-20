import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/countries.service';
import { Subscription, switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit, OnDestroy {

  public country?: Country;
  private countrySubscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.countrySubscription = this.activatedRoute.params
      .pipe (
        switchMap( ({id}) => this.countryService.searchCountryByAlphaCode(id))
      )
      .subscribe( country => {
        if(!country)
          return this.router.navigateByUrl('');
        return this.country = country;
      });
  }

  ngOnDestroy(): void {
    this.countrySubscription?.unsubscribe();
  }

}
