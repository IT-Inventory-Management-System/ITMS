import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DeviceAssignService } from '../shared/services/device-assign.service';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssignDataManagementService } from '../shared/services/assign-data-management.service';
import { SearchBoxComponent } from './search-box/search-box.component';
import { LaptopSearchBoxComponent } from './laptop-search-box/laptop-search-box.component';
import { AccessoriesSearchBoxComponent } from './accessories-search-box/accessories-search-box.component';
import { SoftwareSearchBoxComponent } from './software-search-box/software-search-box.component';
import { SoftwareVersionSearchBoxComponent } from './software-version-search-box/software-version-search-box.component';
import { AssignAccessoriesComponent } from './assign-accessories/assign-accessories.component';


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

  assignAssetForm: FormGroup;
  @ViewChild(SearchBoxComponent) SearchBoxComponent: any;
  @ViewChild(LaptopSearchBoxComponent) LaptopSearchBoxComponent: any;
  @ViewChild(AccessoriesSearchBoxComponent) accessoriesSearchBoxComponent: AccessoriesSearchBoxComponent;
  @ViewChild(SoftwareSearchBoxComponent) softwareSearchBoxComponent: SoftwareSearchBoxComponent;
  @ViewChild(SoftwareVersionSearchBoxComponent) softwareVersionSearchBoxComponent: SoftwareVersionSearchBoxComponent;
  @ViewChild(AssignAccessoriesComponent) assignAccessoriesComponent: AssignAccessoriesComponent;


  constructor(
    private formBuilder: FormBuilder,
    private assignDataManagementService : AssignDataManagementService,
    @Inject(DeviceAssignService) private deviceAssignService: DeviceAssignService) {
    this.assignAssetForm = this.formBuilder.group({
      assignedTo: null,
      cygid: null,
      softwareId: null,
      //selectedAccessory: [null, Validators.required],
      deviceComment: null,
      softwareComment: null,
      //accessoryComment: null,
  })
}

  ngOnInit() {
    console.log("assign-asset init");
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

  closeForm(): void {
    console.log("closeForm");

    this.assignAssetForm.reset();
    this.currentStep = 1;
    //this.searchBoxComponent.setSaveStateOnDestroy();
    //this.assignAccessoriesComponent.setSaveStateOnDestroy();
    //this.laptopSearchBoxComponent.setSaveStateOnDestroy();
    //this.softwareSearchBoxComponent.setSaveStateOnDestroy();
    //this.softwareVersionSearchBoxComponent.setSaveStateOnDestroy();

    this.SearchBoxComponent.setSaveStateOnDestroy();
    //this.LaptopSearchBoxComponent.setSaveStateOnDestroy();
    this.assignDataManagementService.setState("assignedTo", null);
    this.assignDataManagementService.setState("cygid", null);
    this.assignDataManagementService.setState("softwareName", null);
    this.assignDataManagementService.setState("softwareVersion", null);
    this.assignDataManagementService.setState("accessory", null);
    this.assignDataManagementService.setState("laptopComment", null);
    this.assignDataManagementService.setState("softwareComment", null);
    this.assignDataManagementService.setState("accessoryComment", null);
    //this.accessoriesSearchBoxComponent.setSaveStateOnDestroy();


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
