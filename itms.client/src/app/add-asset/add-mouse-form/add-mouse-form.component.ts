import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import {DataService} from '../../../app/shared/services/data.service';

@Component({
  selector: 'app-add-mouse-form',
  templateUrl: './add-mouse-form.component.html',
  styleUrls: ['./add-mouse-form.component.css']
})

export class AddMouseFormComponent {
  constructor(private dataService: DataService) {
    
  }

  ngOnInit(): void {
  }
  dropdownValues: any[] = [];
  currentStep: number = 1;
  showDeviceDetailsForm = false;
  selectedmedium: string='';

  toggleDeviceDetailsForm() {
    this.showDeviceDetailsForm = !this.showDeviceDetailsForm;
  }
  counterValue: number = 0;

  get counterValues(): number[] {
    return Array.from({ length: this.counterValue }, (_, i) => i + 1);
  }

  increment() {
    this.counterValue++;
   
  }

  decrement() {
    if (this.counterValue > 0) {
      this.counterValue--;
    
    }
  }
  next() {
   

      this.currentStep++;
        
  
  }


  previous() {
    this.currentStep--;
  }
  loadMouseBrand() {
    this.dataService.getMouseBrand().subscribe(
      (data) => {
        if (this.selectedmedium === 'wired') {
         
          this.dropdownValues = data.filter(item => item.iswired == 1);
        } else if (this.selectedmedium === 'wireless') {
          this.dropdownValues = data.filter(item => item.iswired == 0);

        }
        else {
          this.dropdownValues = data;
        }
        console.log(data);
      },
      (error) => {
        console.error('Error fetching device data', error);
      }
    );
  }
  onFormSubmitted() {
    this.showDeviceDetailsForm = false;
    this.ngOnInit();
  }
}
