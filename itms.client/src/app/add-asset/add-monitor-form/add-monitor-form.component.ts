import { Component } from '@angular/core';

@Component({
  selector: 'app-add-monitor-form',
  templateUrl: './add-monitor-form.component.html',
  styleUrls: ['./add-monitor-form.component.css']
})
export class AddMonitorFormComponent {
  currentStep: number = 1;
  ifChecked: boolean = false;
  ifCheck: boolean = false;
  showDeviceDetailsForm: boolean=false;
  iCheck: boolean = false;
  selectedStorage: string | null = null;
  counterValue = 0;

  toggleDeviceDetailsForm() {
    this.ifChecked = !this.ifChecked;
  }
  toggleDeviceDetails() {
    this.ifCheck = !this.ifCheck;
  }

  toggleDevice() {
    this.iCheck = !this.iCheck;
  }
  toggleDetails() {
    this.showDeviceDetailsForm = !this.showDeviceDetailsForm;
  }
  onFormSubmitted() {
    this.showDeviceDetailsForm = false;
  }
  selectStorage(value: string) {
    this.selectedStorage = value;
    //this.deviceForm.get('storage')?.setValue(value);
    //this.hideErrorMessage();

  }

  selectOtherStorage(event: any) {
    if (this.selectedStorage == null) {
      //this.deviceForm.get('storage')?.setValue(event.target.value);
      //this.hideErrorMessage();
    }
  
  }


  deselectAllButtons() {
    this.selectedStorage = ''; // Deselect all buttons when input field is clicked
  }
  decrement() {
    if (this.counterValue > 0) {
      this.counterValue--;

    };
  }
    increment() {
      this.counterValue++;
   
      };
    
  next() {


      this.currentStep++;
    

  }


  previous() {
    this.currentStep--;
  }
  

  
}
