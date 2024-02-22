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


  toggleDeviceDetailsForm() {
    this.ifChecked = !this.ifChecked;
  }
  toggleDeviceDetails() {
    this.ifCheck = !this.ifCheck;
  }
}
