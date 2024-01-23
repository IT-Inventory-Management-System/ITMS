import { Component } from '@angular/core';
import { DeviceAssignService } from '../shared/services/device-assign.service';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-assign-asset',
  templateUrl: './assign-asset.component.html',
  styleUrls: ['./assign-asset.component.css']
})
export class AssignAssetComponent {
  currentStep = 1;

  getStepIcon(step: number): string {
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
      this.currentStep += 1; 
    }
  }

  getProgressBarWidth(): string {
    const progress = (this.currentStep - 1) * 50; 
    return `${progress}%`;
  }

  getButtonText(): string {
    if (this.currentStep === 3) {
      return 'Save';
    } else {
      return 'Next';
    }
  }


  users: any[] = [];
  softwares: any[] = [];
  softwareVersions: any[] = [];
  laptops: any[] = [];
  accessories: any[] = [];
  selectedSoftware: any; 

  assignAssetForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    @Inject(DeviceAssignService) private deviceAssignService: DeviceAssignService) {
    this.assignAssetForm = this.formBuilder.group({
      assignedTo: [null, Validators.required],
      cygid: [null, Validators.required],
      softwareId: [null, Validators.required],
      //selectedSoftwareVersion: [null, Validators.required],
      //assignedBy:,
      //assignedDate: ["assignedDate: [new Date().toISOString(), Validators.required],-ec89-4520-8502-0ecd9005f27c", Validators.required],
      //selectedAccessory: [null, Validators.required],
      //laptopComment: null,
      //softwareComment: null,
      //accessoryComment: null,
  })
}

  ngOnInit() {
    this.getUsers();
    this.getSoftwares();
    this.getLaptops();
    this.getAccessories();
  }

  getUsers(): void {
    this.deviceAssignService.getEmployeeBasicDetails().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
  getLaptops(): void {
    this.deviceAssignService.getLaptop().subscribe(
      (data: any[]) => {
        this.laptops = data;
      },
      (error: any) => {
        console.error('Error fetching software details:', error);
      }
    );
  }
  getSoftwares(): void {
    this.deviceAssignService.getSoftware().subscribe(
      (data: any[]) => {
        this.softwares = data;
      },
      (error: any) => {
        console.error('Error fetching software details:', error);
      }
    );
  }

  getSoftwareVersion(SoftwareName: string): void {
    console.log("SoftwareName for version", SoftwareName);
    this.deviceAssignService.getSoftwareVersion(SoftwareName).subscribe(
      (data: any[]) => {
        this.softwareVersions = data;
      },
      (error: any) => {
        console.error('Error fetching software version details:', error);
      }
    );
  }
  getAccessories(): void {
    this.deviceAssignService.getAccessories().subscribe(
      (data: any[]) => {
        this.accessories = data;
      },
      (error: any) => {
        console.error('Error fetching software details:', error);
      }
    );
  }

  onSoftwareSelected(software: any): void {
    this.selectedSoftware = software;
    this.getSoftwareVersion(software.softwareName);
  }
 
  saveChanges(): void {
    console.log('Form Values:', this.assignAssetForm.value);
    if (this.assignAssetForm.valid) {
      const assignmentData = this.assignAssetForm.value;
      this.deviceAssignService.saveAssignment(assignmentData).subscribe(
        (response) => {
          console.log('Assignment saved successfully:', response);
          this.assignAssetForm.reset();
        },
        (error) => {
          console.error('Error saving assignment:', error);
        }
      );
    } else {
      console.log('Form is invalid. Cannot save changes.');
    }
  }
}
