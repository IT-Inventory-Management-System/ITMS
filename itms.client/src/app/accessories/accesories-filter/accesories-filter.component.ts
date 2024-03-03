import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SelectedCountryService } from '../../shared/services/selected-country.service';

@Component({
  selector: 'app-accesories-filter',
  templateUrl: './accesories-filter.component.html',
  styleUrls: ['./accesories-filter.component.css']
})
export class AccesoriesFilterComponent {



  Type: string[] = ["Wired", "Wireless"];
  Brand: string[] = ["Available", "Assigned"];
  StockStatus: string[] = ["Low In Stock", "Out Of Stock", "In Stock"];

  @Output() applyClicked: EventEmitter<any> = new EventEmitter<any>();


  Availability: string = "";
  selectedStock: string[] = [];
  selectedLocation: any = '';
  IsWired: string = '';

  Category: string = '';

  constructor(private selectedCountryService: SelectedCountryService) { }

  ngOnInit(): void {
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.selectedLocation = selectedCountry;
      this.IsWired = '';
      this.selectedStock = [];
      this.Availability = '',
      this.Apply();
    });

  }

  toggleCheckboxType(status: string) {
    this.IsWired = (this.IsWired === status) ? "" : status;
    //console.log(this.IsWired);
  }

  toggleCheckboxStatus(status: string) {
    this.Availability = (this.Availability === status) ? "" : status;
   // console.log(this.Availability);
  }

  dropDownSelect() {
    //console.log(this.Category); 
  }

  isSelectedStock(status: string): boolean {
    return this.selectedStock.includes(status);
  }

  toggleCheckboxStock(status: string): void {
    if (this.isSelectedStock(status)) {
      this.selectedStock = this.selectedStock.filter(stock => stock !== status);
    } else {
      this.selectedStock.push(status);
    }
  }
 
  Apply() {
    this.applyClicked.emit({
      IsWired: this.IsWired,
      Availability: this.Availability,
      selectedStock: this.selectedStock,
      Category: this.Category,
    });
  }

}
