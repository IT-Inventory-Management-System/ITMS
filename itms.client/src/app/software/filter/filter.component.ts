import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {


 
  SoftwareType: string[] = ["Perpetual", "Validity", "Subscription"];
  SoftwareStatus: string[] = ["Active", "Archive"];
  StockStatus: string[] = ["Low In Stock", "Out Of Stock", "In Stock"];

  

  checked: string = ""; // To store the checked status

  toggleCheckbox(status: string) {
    // Implement logic to handle checkbox state for each status
    this.checked = (this.checked === status) ? "" : status;
  }


}
