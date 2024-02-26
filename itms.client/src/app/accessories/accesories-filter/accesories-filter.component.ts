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


  stat: string = "";
  selectedStock: string[] = [];
  selectedLocation: any = '';
  selectedType: string = '';

  selectedAccessoryType: string = '';

  constructor(private selectedCountryService: SelectedCountryService) { }

  ngOnInit(): void {
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.selectedLocation = selectedCountry;
      this.selectedType = '';
      this.selectedStock = [];
      this.stat = '',
      this.Apply();
    });

  }

  toggleCheckboxType(status: string) {
    this.selectedType = (this.selectedType === status) ? "" : status;
    console.log(this.selectedType);
  }

  toggleCheckboxStatus(status: string) {
    this.stat = (this.stat === status) ? "" : status;
    console.log(this.stat);
  }

  dropDownSelect() {
    console.log(this.selectedAccessoryType); 
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
      selectedType: this.selectedType,
      stat: this.stat,
      selectedStock: this.selectedStock,
      selectedAccessoryType: this.selectedAccessoryType,
    });
  }

}
