import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.css']
})
export class CountryTableComponent {

  @Input()
  public countries: Country[] = [];

  public currentPage: number = 1; // Página actual
  public countriesPerPage: number = 10; // Número de países por página

  // Método para obtener los países para la página actual
  get paginatedCountries(): Country[] {
    const startIndex = (this.currentPage - 1) * this.countriesPerPage;
    return this.countries.slice(startIndex, startIndex + this.countriesPerPage);
  }

  // Método para cambiar de página
  public changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Método para obtener el número total de páginas
  get totalPages(): number {
    return Math.ceil(this.countries.length / this.countriesPerPage);
  }
}
