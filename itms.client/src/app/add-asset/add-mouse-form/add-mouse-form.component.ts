import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-mouse-form',
  templateUrl: './add-mouse-form.component.html',
  styleUrls: ['./add-mouse-form.component.css']
})
export class AddMouseFormComponent {
  currentStep: number = 1;
  showDeviceDetailsForm = false;

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
}
