import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe (
        switchMap( ({id}) => this.countryService.searchCountryByAlphaCode(id))
      )
      .subscribe( country => {
        if(!country)
          return this.router.navigateByUrl('');
        return this.country = country;
      });
  }
}
