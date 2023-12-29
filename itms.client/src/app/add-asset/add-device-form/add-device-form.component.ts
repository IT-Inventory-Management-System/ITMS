import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../app/shared/services/data.service';


@Component({
  selector: 'app-add-device-form',
  templateUrl: './add-device-form.component.html',
  styleUrls: ['./add-device-form.component.css']
})
export class AddDeviceFormComponent implements OnInit {

  dropdownValues: any[] = [];
  constructor(private dataService: DataService) {
    this.dropdownValues = [];
  }

  ngOnInit(): void {
    this.loadDropdownValues();
  }

  loadDropdownValues() {
    this.dataService.getDropdownValues().subscribe(
      (data) => {
        this.dropdownValues = data
        console.log(data);
      },
      (error) => {
        console.error('Error fetching dropdown values', error);
      }
    );
  }

  counterValue = 0;
    
  increment() {
      this.counterValue++;
    }

    decrement() {
      if (this.counterValue > 0) {
        this.counterValue--;
      }
    }

  showDeviceDetailsForm = false;

  toggleDeviceDetailsForm() {
    this.showDeviceDetailsForm = !this.showDeviceDetailsForm;
  }

 }
