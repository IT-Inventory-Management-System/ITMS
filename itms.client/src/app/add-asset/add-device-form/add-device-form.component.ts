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

  currentStep: number = 1;

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

  counterValue: number = 0;
    
  increment() {
      this.counterValue++;
    }

    decrement() {
      if (this.counterValue > 0) {
        this.counterValue--;
      }
    }

  counterRange: number[] = Array.from({ length: this.counterValue }, (_, i) => i + 1);

  showDeviceDetailsForm = false;

  toggleDeviceDetailsForm() {
    this.showDeviceDetailsForm = !this.showDeviceDetailsForm;
  }

  next() {
    console.log(this.currentStep);
    this.currentStep++;
  }

 }
