import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {


 
  SoftwareType: string[] = ["Perpetual", "Validity", "Subscription"];
  SoftwareStatus: string[] = ["Active", "Archive"];
  StockStatus: string[] = ["Low In Stock", "Out Of Stock", "In Stock"];

  @Output() applyClicked: EventEmitter<any> = new EventEmitter<any>();

  type: string = "";
  stat: string = "";
  stock: string = "";

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

  Apply() {
    this.applyClicked.emit({
      type: this.type,
      stat: this.stat,
      stock: this.stock,
    });
  }
}
