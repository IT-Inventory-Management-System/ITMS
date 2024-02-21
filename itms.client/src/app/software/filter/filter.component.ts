import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SelectedCountryService } from '../../shared/services/selected-country.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {


 
  SoftwareType: string[] = ["Perpetual", "Validity", "Subscription"];
  SoftwareStatus: string[] = ["Active", "Archive"];
  StockStatus: string[] = ["Low In Stock", "Out Of Stock", "In Stock"];

  @Output() applyClicked: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('toInput') toInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fromInput') fromInput!: ElementRef<HTMLInputElement>;

  type: string = "";
  stat: string = "";
  stock: string = "";
  from: Date | null;
  to: Date | null;
  selectedLocation: any = '';

  constructor(private selectedCountryService: SelectedCountryService) { }

  ngOnInit(): void {
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.selectedLocation = selectedCountry;
      this.type = '';
      this.stock = '';
      this.from = null;
      this.to = null;
      if (this.toInput) {
        this.toInput.nativeElement.value = '';
      }
      if (this.fromInput) {
        this.fromInput.nativeElement.value = '';
      }
      this.Apply();
    });

  }




  toggleCheckboxType(status: string) {
    this.type = (this.type === status) ? "" : status;
    console.log(this.type);
  }

  toggleCheckboxStatus(status: string) {
    this.stat = (this.stat === status) ? "" : status;
    console.log(this.stat);
  }

  toggleCheckboxStock(status: string) {
    this.stock = (this.stock === status) ? "" : status;
    console.log(this.stock);
  }
  toggleInputType(type: string) {
    const inputElement = document.querySelector('#from');
    if (inputElement) {
      inputElement.setAttribute('type', type);
    }
  }

  toggleCheckboxFrom(value: string) {
    this.from = new Date(value);
    const formattedDate = this.from.toISOString().split('T')[0];
    console.log(formattedDate);
  }

  toggleInputTypeTo(type: string) {
    const inputElement = document.querySelector('#to');
    if (inputElement) {
      inputElement.setAttribute('type', type);
    }
  }

  toggleCheckboxTo(value: string) {
    this.to = new Date(value);
    const formattedDate = this.to.toISOString().split('T')[0];
    console.log(formattedDate);
  }

  Apply() {
    this.applyClicked.emit({
      type: this.type,
      stat: this.stat,
      stock: this.stock,
      from: this.from,
      to: this.to,
    });
  }
}
