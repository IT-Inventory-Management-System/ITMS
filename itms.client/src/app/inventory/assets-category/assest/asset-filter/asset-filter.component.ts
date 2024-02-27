import { Component } from '@angular/core';
import { DataService } from '../../../../shared/services/data.service';

@Component({
  selector: 'app-asset-filter',
  templateUrl: './asset-filter.component.html',
  styleUrls: ['./asset-filter.component.css']
})
export class AssetFilterComponent {

  deviceStatus: string[] = ["Assigned", "Available", "Archive"];
  operatingSystem: string[] = ["Windows", "Mac"];
  uniqueProcessor: any[] = [];
  from: '';
  to: '';

  constructor(private dataService: DataService) {
    this.dataService.getUniqueProcessor().subscribe(
      (data) => {
        this.uniqueProcessor = data;  
      },
      (error) => {
        console.log(error);
      })
  }

  selectedCheckboxes: { [key: string]: any } = {
    operatingSystem: [],
    deviceStatus: [],
    uniqueProcessor: [],
    fromDate: '',
    toDate: ''
  };

  checked: string = "";

  toggleCheckbox(value: any, category:string) {
    // Implement logic to handle checkbox state for each status
    if (category === 'fromDate' || category === 'toDate') {
      // Handle date filters
      this.selectedCheckboxes[category] = value;
    } else {
      // Handle checkbox categories
      const categoryCheckboxes = this.selectedCheckboxes[category];
      const index = categoryCheckboxes.indexOf(value);

      if (index === -1) {
        // Checkbox was checked, add to the selected list
        categoryCheckboxes.push(value);
        this.checked = value;
      } else {
        // Checkbox was unchecked, remove from the selected list
        categoryCheckboxes.splice(index, 1);
        this.checked = "";
      }
    }

    // Log the selected values (you can use this.selectedCheckboxes for further processing)
    console.log("Selected Checkboxes:", this.selectedCheckboxes);
  }
}
