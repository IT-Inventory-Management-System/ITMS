import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DeviceAssignService } from '../shared/services/device-assign.service';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AssignDataManagementService } from '../shared/services/assign-data-management.service';
import { SearchBoxComponent } from './search-box/search-box.component';
import { LaptopSearchBoxComponent } from './laptop-search-box/laptop-search-box.component';
import { AccessoriesSearchBoxComponent } from './accessories-search-box/accessories-search-box.component';
import { SoftwareSearchBoxComponent } from './software-search-box/software-search-box.component';
import { SoftwareVersionSearchBoxComponent } from './software-version-search-box/software-version-search-box.component';
import { AssignAccessoriesComponent } from './assign-accessories/assign-accessories.component';
import { ToastrService } from 'ngx-toastr';
import { customValidation } from './custom-validators';
import { SelectedCountryService } from '../shared/services/selected-country.service';
import { DataService } from '../shared/services/data.service';
import { CloseFlagService } from '../shared/services/close-flag.service';
import { AssignLaptopComponent } from './assign-laptop/assign-laptop.component';

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
  isCygidEmptyStep1: boolean = true;
  isSoftwareIdEmptyStep2: boolean = true;

  onCygidInputChangeStep1(value: boolean) {
    this.isCygidEmptyStep1 = value;
  }

  onSoftwareIdInputChangeStep2(value: boolean) {
    this.isSoftwareIdEmptyStep2 = value;
  }

  totalUsersData: any[] = [];
  totalSoftwaresData: any[] = [];
  totalLaptopsData: any[] = [];
  totalAccessoriesData: any[] = [];
  users: any[] = [];
  softwares: any[] = [];
  softwareVersions: any[] = [];
  laptops: any[] = [];
  accessories: any[] = [];
  locationId: string = '';
  closeFlag$ = this.closeFlag.closeFlag$;

  assignAssetForm: FormGroup;
  @ViewChild(SearchBoxComponent) SearchBoxComponent: any;
  @ViewChild(LaptopSearchBoxComponent) LaptopSearchBoxComponent: any;
  @ViewChild(AccessoriesSearchBoxComponent) accessoriesSearchBoxComponent: AccessoriesSearchBoxComponent;
  @ViewChild(SoftwareSearchBoxComponent) softwareSearchBoxComponent: SoftwareSearchBoxComponent;
  @ViewChild(SoftwareVersionSearchBoxComponent) softwareVersionSearchBoxComponent: SoftwareVersionSearchBoxComponent;
  @ViewChild(AssignAccessoriesComponent) assignAccessoriesComponent: AssignAccessoriesComponent;
  @ViewChild(AssignLaptopComponent) assignLaptopComponent: AssignLaptopComponent;
  @ViewChild(LaptopSearchBoxComponent) laptopSearchBoxComponent: LaptopSearchBoxComponent;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private assignDataManagementService: AssignDataManagementService,
    private closeFlag: CloseFlagService,
    private selectedCountryService: SelectedCountryService,
    private dataService: DataService,
    @Inject(DeviceAssignService) private deviceAssignService: DeviceAssignService) {
    this.assignAssetForm = this.formBuilder.group({
      assignedTo: [null, Validators.required],
      cygid: [null],
      softwareId: [null],
      //selectedAccessory: [null, Validators.required],
      deviceComment: [null],
      softwareComment: [null],
      //accessoryComment: [null],
      assignedBy:[null],
    }, { validator: customValidation(this.toastr) });
  }

  ngOnInit() {
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.getDeviceLocation();
    });
    //this.getUsers();
    this.getSoftwares();
    this.getLaptops();
    this.getAccessories();
  }

  getDeviceLocation() {
    this.dataService.getLocation().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == localStorage.getItem('selectedCountry')) {
            this.locationId = data[i].id;
            this.users = this.totalUsersData.filter(item => item.locationId === this.locationId);
            this.laptops = this.totalLaptopsData.filter(item => item.locationId === this.locationId);
            this.softwares = this.totalSoftwaresData.filter(item => item.locationId === this.locationId);
            this.accessories = this.totalAccessoriesData.filter(item => item.locationId === this.locationId);
            this.getUsers();
            break;
          }
        }
      },
      (error) => {
        console.log("User not found");
      });
  }

  getUsers(): void {
    this.deviceAssignService.getEmployeeBasicDetails(this.locationId).subscribe(
      (data: any[]) => {
        this.totalUsersData = data;
        this.users = this.totalUsersData.filter(item => item.locationId === this.locationId);
      },
      (error: any) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
  getLaptops(): void {
    this.deviceAssignService.getLaptop().subscribe(
      (data: any[]) => {
        this.totalLaptopsData = data;
        this.laptops = this.totalLaptopsData.filter(item => item.locationId === this.locationId);
      },
      (error: any) => {
        console.error('Error fetching software details:', error);
      }
    );
  }
  getSoftwares(): void {
    this.deviceAssignService.getSoftware().subscribe(
      (data: any[]) => {
        this.totalSoftwaresData = data;
        this.softwares = this.totalSoftwaresData.filter(item => item.locationId === this.locationId);
      },
      (error: any) => {
        console.error('Error fetching software details:', error);
      }
    );
  }

  getAccessories(): void {
    this.deviceAssignService.getAccessories().subscribe(
      (data: any[]) => {
        this.totalAccessoriesData = data;
        this.accessories = this.totalAccessoriesData
          //.filter(item => item.locationId === this.locationId);
      },
      (error: any) => {
        console.error('Error fetching software details:', error);
      }
    );
  }

  closeForm(): void {
    //console.log("closeForm");
    this.assignAssetForm.reset();
    this.currentStep = 1;
    this.closeFlag.setCloseFlagToTrue();
    //this.searchBoxComponent.setSaveStateOnDestroy();
    //this.assignAccessoriesComponent.setSaveStateOnDestroy();
    //this.laptopSearchBoxComponent.setSaveStateOnDestroy();
    //this.softwareSearchBoxComponent.setSaveStateOnDestroy();
    //this.softwareVersionSearchBoxComponent.setSaveStateOnDestroy();
    //if (this.currentStep == 1) {
      //this.assignLaptopComponent.setSaveStateOnDestroy();
      //this.laptopSearchBoxComponent.setSaveStateOnDestroy();
    //}
    this.SearchBoxComponent.setSaveStateOnDestroy();
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
    const userData = localStorage.getItem('user');
    if (!userData) {
      this.toastr.error('Logged in User data not found. Cannot save changes.');
      return;
    }
    const userObject = JSON.parse(userData);

    const AssignedBy = userObject ? userObject.id : null;

    if (!AssignedBy) {
      this.toastr.error('CGIID not found in user data. Cannot save changes.');
      return;
    }
    if (this.assignAssetForm.valid) {
      const assignmentData = this.assignAssetForm.value;
      assignmentData.assignedBy = AssignedBy;
      this.deviceAssignService.saveAssignment(assignmentData).subscribe(
        (response) => {
          this.closeForm();
          this.assignAssetForm.reset();
          this.toastr.success('Assignment saved successfully:', response);
        },
        (error) => {
          this.closeForm();
          this.assignAssetForm.reset();
          this.toastr.error('Error saving assignment:', error);
        }
      );
    } else {
      const errors = this.assignAssetForm.errors;

      if (errors) {
        for (const key of Object.keys(errors)) {
          const message = errors[key];
          this.toastr.error(message);
        }
      } else {
        this.toastr.error('Form is invalid. Cannot save changes.');
      }

      this.closeForm();
      this.assignAssetForm.reset();
    }
  }
}
