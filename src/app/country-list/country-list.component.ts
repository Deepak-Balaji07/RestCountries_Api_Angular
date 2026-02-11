import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
})
export class CountryListComponent implements OnInit {
  countries: any[] = [];
  searchText = '';
  searchType = 'name';
  noResultFound = false;


  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries() {
    this.countryService.getAllCountries().subscribe((res) => {
      this.countries = res;
    });
  }

  search() {
  this.noResultFound = false;

  if (!this.searchText) {
    this.loadCountries();
    return;
  }

  if (this.searchType === 'name') {
    this.countryService.searchByName(this.searchText).subscribe({
      next: (res: any[]) => {
        this.countries = res;
        this.noResultFound = res.length === 0;
      },
      error: () => {
        this.countries = [];
        this.noResultFound = true;
      }
    });

  } else if (this.searchType === 'capital') {
    this.countryService.searchByCapital(this.searchText).subscribe({
      next: (res: any[]) => {
        this.countries = res;
        this.noResultFound = res.length === 0;
      },
      error: () => {
        this.countries = [];
        this.noResultFound = true;
      }
    });

  } else if (this.searchType === 'code') {
    this.countryService.searchByCode(this.searchText).subscribe({
      next: (res: any) => {
        this.countries = Array.isArray(res) ? res : [res];
        this.noResultFound = this.countries.length === 0;
      },
      error: () => {
        this.countries = [];
        this.noResultFound = true;
      }
    });
  }
}

}
