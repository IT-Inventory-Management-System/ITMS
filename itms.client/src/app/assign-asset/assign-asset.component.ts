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
  softwares: any[] = [];
  selectedSoftware: any;
  softwareVersions: any[] = [];
  selectedSoftwareVersion: any;
  laptops: any[] = [];
  selectedLaptop: any;
  accessories: any[] = [];
  selectedAccessory: any;
  laptopComment: any;
  softwareComment: any;
  accessoryComment: any;

  assignAssetForm: FormGroup;

  constructor(private formBuilder: FormBuilder, @Inject(DeviceAssignService) private deviceAssignService: DeviceAssignService) {
    this.assignAssetForm = this.formBuilder.group({
      selectedUser: [null, Validators.required],
      selectedLaptop: [null, Validators.required],
      selectedSoftware: [null, Validators.required],
      selectedSoftwareVersion: [null, Validators.required],
      selectedAccessory: [null, Validators.required],
      laptopComment: null,
      softwareComment: null,
      accessoryComment: null,
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
        console.log('Fetched Users:', data);
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
        console.log('Fetched Laptops:', data);
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
        console.log('Fetched Softwares:', data);
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
        console.log('Fetched SoftwaresVersion:', data);
        this.softwareVersions = data;
      },
      (error: any) => {
        console.error('Error fetching software version details:', error);
      }
    );
  }
  getAccessories(): void {
    this.deviceAssignService.getEmployeeBasicDetails().subscribe(
      (data: any[]) => {
        console.log('Fetched Accessories:', data);
        this.accessories = data;
      },
      (error: any) => {
        console.error('Error fetching software details:', error);
      }
    );
  }

  onUserSelected(user: any): void {
    this.selectedUser = user;
    console.log("assign user", user);
  }
  onLaptopSelected(laptop: any): void {
    this.selectedLaptop = laptop;
    console.log("assign laptop", laptop);
  }
  onSoftwareSelected(software: any): void {
    this.selectedSoftware = software;
    console.log("assign software", software);
    this.getSoftwareVersion(software.softwareName);
  }

  onSoftwareVersionSelected(softwareVersion: any): void {
    this.selectedSoftwareVersion = softwareVersion;
    console.log("assign software version", softwareVersion);
  }
  onAccessoriesSelected(accessories: any): void {
    this.selectedAccessory = accessories;
    console.log("assign accessory", accessories);
  }

  onLaptopComment(comment: any): void {
    this.laptopComment = comment;
    console.log("laptop comment", comment);
  }
  onSoftwareComment(comment: any): void {
    this.softwareComment = comment;
    console.log("software comment", comment);
  }
  onAccessoryComment(comment: any): void {
    this.accessoryComment = comment;
    console.log("accessory comment", comment);
  }

  saveChanges(): void {
    console.log('Form Values:', this.assignAssetForm.value);
  }
}
