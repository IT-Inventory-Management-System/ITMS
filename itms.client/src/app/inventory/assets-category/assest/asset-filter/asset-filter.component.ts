import { Component } from '@angular/core';
import { DataService } from '../../../../shared/services/data.service';

@Component({
  selector: 'app-asset-filter',
  templateUrl: './asset-filter.component.html',
  styleUrls: ['./asset-filter.component.css']
})
export class AssetFilterComponent {

  deviceStatus: string[] = ["Assigned", "Available", "Both"];
  operatingSystem: string[] = ["Windows", "Mac"];
  uniqueProcessor: any[] = []; 

  constructor(private dataService: DataService) {
    this.dataService.getUniqueProcessor().subscribe(
      (data) => {
        this.uniqueProcessor = data;  
      },
      (error) => {
        console.log(error);
      })
  }

  checked: string = ""; // To store the checked status

  toggleCheckbox(status: string) {
    // Implement logic to handle checkbox state for each status
    this.checked = (this.checked === status) ? "" : status;
  }
}
