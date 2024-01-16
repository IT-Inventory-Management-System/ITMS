import { Component } from '@angular/core';
import { DeviceAssignService } from '../shared/services/device-assign.service';



@Component({
  selector: 'app-assign-asset',
  templateUrl: './assign-asset.component.html',
  styleUrls: ['./assign-asset.component.css']
})
export class AssignAssetComponent {
  currentStep = 1;

  getStepIcon(step: number): string {
    // Change the icons dynamically based on the current step
    switch (step) {
      case 1:
        return this.currentStep > 1 ? '../../../../../../../../assets/icons/completed.svg' : 'assets/icons/laptop-solid.svg';
      case 2:
        return this.currentStep > 2 ? '../../../../assets/icons/completed.svg' : '../../../../assets/icons/Software.svg';
      case 3:
        return this.currentStep > 3 ? '../../../../assets/icons/completed.svg' : '../../../../assets/icons/laptop-solid.svg';
      default:
        return '';
    }
  }

  getStepText(step: number): string {
    switch (step) {
      case 1:
        return 'Laptop';
      case 2:
        return 'Software';
      case 3:
        return 'Accessories';
      default:
        return '';
    }
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  skipStep() {
    if (this.currentStep < 3) {
      this.currentStep += 1; // Skip to the next step directly
    }
  }

  getProgressBarWidth(): string {
    const progress = (this.currentStep - 1) * 50; // Assuming 50% width per step
    return `${progress}%`;
  }

  getButtonText(): string {
    if (this.currentStep === 3) {
      return 'Save Changes';
    } else {
      return 'Next';
    }
  }
  users: any[] = [];
  selectedUser: any;

  constructor(private deviceAssignService: DeviceAssignService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.deviceAssignService.getEmployeeBasicDetails().subscribe(
      (data: any[]) => {
        console.log('Fetched Users:', data);
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  onUserSelected(user: any): void {
    this.selectedUser = user;
  }

  saveChanges(): void {
    console.log('Selected User:', this.selectedUser);
  }
}
