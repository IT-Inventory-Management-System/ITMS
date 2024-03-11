import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DeviceAssignService } from '../shared/services/device-assign.service';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, ValidationErrors, ValidatorFn, Validators, FormArray } from '@angular/forms';
import { AssignDataManagementService } from '../shared/services/assign-data-management.service';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ToastrService } from 'ngx-toastr';
import { SelectedCountryService } from '../shared/services/selected-country.service';
import { DataService } from '../shared/services/data.service';
import { CloseFlagService } from '../shared/services/close-flag.service';
//import { customValidation } from './custom-validators';
//import { LaptopSearchBoxComponent } from './laptop-search-box/laptop-search-box.component';
//import { AccessoriesSearchBoxComponent } from './accessories-search-box/accessories-search-box.component';
//import { SoftwareSearchBoxComponent } from './software-search-box/software-search-box.component';
//import { SoftwareVersionSearchBoxComponent } from './software-version-search-box/software-version-search-box.component';
//import { AssignAccessoriesComponent } from './assign-accessories/assign-accessories.component';
//import { AssignLaptopComponent } from './assign-laptop/assign-laptop.component';

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
  isAccessoryIdEmptyStep3: boolean = true;

  onCygidInputChangeStep1(value: boolean):void {
    this.isCygidEmptyStep1 = value;
  }

  onSoftwareIdInputChangeStep2(data:any): void  {
    this.isSoftwareIdEmptyStep2 = data.allSelected;
    this.softwares = data.SoftwareOptions;
    console.log("outermost", this.softwares);
  }
  onAccessoryIdInputChangeStep3(value: boolean): void {
    this.isAccessoryIdEmptyStep3 = value;
  }

  isNextButtonEnabled(): boolean {
    return (this.currentStep === 1 && this.isCygidEmptyStep1) ||
      (this.currentStep === 2 && this.isSoftwareIdEmptyStep2);
  }


  totalUsersData: any[] = [];
  totalSoftwaresData: any[] = [];
  totalLaptopsData: any[] = [];
  totalAccessoriesData: any[] = [];
  users: any[] = [];
  dupSoftwares: any[] = [];

  softwares: any[] = [];

  softwareVersions: any[] = [];
  laptops: any[] = [];
  accessories: any[] = [];
  locationId: string = '';
  closeFlag$ = this.closeFlag.closeFlag$;

  assignAssetForm: FormGroup;
  @ViewChild(SearchBoxComponent) SearchBoxComponent: any;
  //@ViewChild(LaptopSearchBoxComponent) LaptopSearchBoxComponent: any;
  //@ViewChild(AccessoriesSearchBoxComponent) accessoriesSearchBoxComponent: AccessoriesSearchBoxComponent;
  //@ViewChild(SoftwareSearchBoxComponent) softwareSearchBoxComponent: SoftwareSearchBoxComponent;
  //@ViewChild(SoftwareVersionSearchBoxComponent) softwareVersionSearchBoxComponent: SoftwareVersionSearchBoxComponent;
  //@ViewChild(AssignAccessoriesComponent) assignAccessoriesComponent: AssignAccessoriesComponent;
  //@ViewChild(AssignLaptopComponent) assignLaptopComponent: AssignLaptopComponent;
  //@ViewChild(LaptopSearchBoxComponent) laptopSearchBoxComponent: LaptopSearchBoxComponent;
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
      assignedBy: [null, Validators.required],
      cygids: this.formBuilder.array([]),
      softwareIds: this.formBuilder.array([]),
      accessoryIds: this.formBuilder.array([]),
      deviceComments: this.formBuilder.array([]),
      softwareComments: this.formBuilder.array([]),
      accessoryComments: this.formBuilder.array([])
      //selectedAccessory: [null, Validators.required],
      //deviceComment: [null],
      //cygid: [null],
      //softwareId: [null],
      //softwareComment: [null],
      //accessoryComment: [null],
    },
    //  { validator: customValidation(this.toastr) }
    );
  }

  ngOnInit() {
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.getDeviceLocation();
    });
    //this.getUsers();
    this.getSoftwares();
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

            console.log("software-loaction", this.softwares);
            this.accessories = this.totalAccessoriesData.filter(item => item.locationId === this.locationId);
            this.getUsers();
            this.getLaptops();
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
    this.deviceAssignService.getLaptop(this.locationId).subscribe(
      (data: any[]) => {
        this.totalLaptopsData = data;
        //this.laptops = this.totalLaptopsData.filter(item => item.locationId === this.locationId);
        this.laptops = this.totalLaptopsData.filter(item => item.isArchived === false);

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
        this.dupSoftwares = data;
        this.softwares = data;
        this.softwares = this.totalSoftwaresData.filter(item => item.locationId === this.locationId);
        const groupedSoftware = this.totalSoftwaresData.reduce((acc, curr) => {
          const key = `${curr.softwareName}_${curr.softwareType}_${curr.version}`;
          if (curr.assignedTo === null) { 
            acc[key] = (acc[key] || 0) + 1;
          }
          return acc;
        }, {});
        this.softwares.forEach(software => {
          const key = `${software.softwareName}_${software.softwareType}_${software.version}`;
          software.count = groupedSoftware[key] || 0;


          const uniqueSoftwareMap = this.softwares.reduce((acc, curr) => {
            const key = `${curr.softwareName}_${curr.softwareType}_${curr.version}`;
            if (!acc[key]) {
              acc[key] = curr;
            }
            return acc;
          }, {});

          this.softwares = Object.values(uniqueSoftwareMap);
        });
        console.log("softwares-asset",this.softwares);
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
    this.getSoftwares();
    //console.log("closeForm");
    this.assignAssetForm.reset();
    this.currentStep = 1;
    this.closeFlag.setCloseFlagToTrue();
    this.SearchBoxComponent.setSaveStateOnDestroy();
    this.assignDataManagementService.setState('assignedTo', null);
    this.assignDataManagementService.setState('accessory', null);
    this.assignDataManagementService.setState('accessoryComment', null);
    this.assignDataManagementService.setMultipleInstanceState('selectedLaptops', []);
    this.assignDataManagementService.setMultipleInstanceState('formattedAges', []);
    this.assignDataManagementService.setMultipleInstanceState('devices', []);
    this.assignDataManagementService.setMultipleInstanceState('softwares', []);
    this.assignDataManagementService.setMultipleInstanceState('softwareNames', []);
    this.assignDataManagementService.setMultipleInstanceState('softwareVersions', []);
    this.assignDataManagementService.setMultipleInstanceState('softwareExpiryDate', []);
    this.assignDataManagementService.setMultipleInstanceState('FilteredSoftwaresOptions', []);
    this.assignDataManagementService.setMultipleInstanceState('SelectedSoftwaresData', []);
    this.assignDataManagementService.setMultipleInstanceState('SoftwareVersionsOptions', []);
    this.assignDataManagementService.resetSpecificStateVariables();
    this.isCygidEmptyStep1 = true;
    this.isSoftwareIdEmptyStep2 = true;
    this.isAccessoryIdEmptyStep3 = true;
  }

  removeNullIndexInstances(): void {
    const cygidsArray = this.assignAssetForm.get('cygids') as FormArray;
    const softwareIdsArray = this.assignAssetForm.get('softwareIds') as FormArray;
    const deviceCommentsArray = this.assignAssetForm.get('deviceComments') as FormArray;
    const softwareCommentsArray = this.assignAssetForm.get('softwareComments') as FormArray;

    this.removeNullIndexItems(cygidsArray);
    this.removeNullIndexItems(softwareIdsArray);
    this.removeNullIndexItems(deviceCommentsArray);
    this.removeNullIndexItems(softwareCommentsArray);
  }

  removeNullIndexItems(array: FormArray): void {
    for (let i = array.length - 1; i >= 0; i--) {
      if (array.at(i)?.get('index')?.value === null) {
        array.removeAt(i);
      }
    }
  }

  saveChanges(): void {
    this.removeNullIndexInstances();
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

    this.assignAssetForm.get('assignedBy')?.setValue(AssignedBy);

    if (!this.assignAssetForm?.get('assignedTo')?.value) {
      this.toastr.error('Assigned To is required.');
      return;
    }

    //const softwareIds = this.assignAssetForm?.get('softwareIds')?.value;
    //const cygids = this.assignAssetForm?.get('cygids')?.value;

    //if (!softwareIds.length && !cygids.length) {
    //  this.toastr.error('At least one of Laptop / Software / Accessory must be selected.');
    //  return;
    //}

    //if (this.assignAssetForm.valid) {
    //  const assignmentData = this.assignAssetForm.value;
    //  assignmentData.assignedBy = AssignedBy;

    //} else {
    //  const errors = this.assignAssetForm.errors;

    //  if (errors) {
    //    for (const key of Object.keys(errors)) {
    //      const message = errors[key];
    //      this.toastr.error(message);
    //    }
    //  } else {
    //    this.toastr.error('Form is invalid. Cannot save changes.');
    //  }
    // }

    const input = {
      deviceCYGIDs: [] as any[],
      softwareIds: [] as { softwareId: string, version: string }[],
      accessoryCYGIDs: [] as any[],
      assignedTo: this.assignAssetForm?.get('assignedTo')?.value,
      assignedBy: this.assignAssetForm?.get('assignedBy')?.value,
      deviceComments: [] as any[],
      softwareComments: [] as any[],
      accessoryComments: [] as any[]
    }

    var deviceIds = this.assignAssetForm?.get('cygids')?.value;
    var deviceCommentArray = this.assignAssetForm?.get('deviceComments')?.value;
    var selectedSoftwareIds = this.assignAssetForm?.get('softwareIds')?.value;
    var selectedSoftwareComments = this.assignAssetForm?.get('softwareComments')?.value;
    console.log("selectedSoftwareComments", selectedSoftwareComments);
    var accessoryIds = this.assignAssetForm?.get('accessoryIds')?.value;
    var accessoryCommentArray = this.assignAssetForm?.get('accessoryComments')?.value;

    for (var i = 0; i < deviceIds.length; i++) {
      if (deviceIds[i].index != null)
        input.deviceCYGIDs.push(deviceIds[i].cygid)
        input.deviceComments.push(deviceCommentArray[i].deviceComment)
    }

    for (var i = 0; i < selectedSoftwareIds.length; i++) {
      if (selectedSoftwareIds[i].index != null) {
        input.softwareIds.push({ softwareId: selectedSoftwareIds[i].softwareId, version: selectedSoftwareIds[i].softwareversion });
        input.softwareComments.push(selectedSoftwareComments[i].deviceComment);
      }
    }

    for (var i = 0; i < accessoryIds.length; i++) {
      if (accessoryIds[i].index != null)
        input.accessoryCYGIDs.push(accessoryIds[i].accessoryId)
      input.accessoryComments.push(accessoryCommentArray[i].deviceComment)
    }


    console.log("INPUT DATA : ",input);

    this.deviceAssignService.saveAssignment(input).subscribe(
          (response : any) => {
            this.closeForm();
            this.assignAssetForm.reset();
            this.toastr.success('Assignment saved successfully');
          },
          (error) => {
            this.closeForm();
            this.assignAssetForm.reset();
            this.toastr.error('Error saving assignment:', error);
          }
        );
 
  }
}
