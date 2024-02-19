import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';

@Component({
  selector: 'app-assign-software',
  templateUrl: './assign-software.component.html',
  styleUrls: ['./assign-software.component.css']
})
export class AssignSoftwareComponent {
  @Input() SoftwareOptions: any[] = [];
  @Input() assignAssetForm: FormGroup;
  @Output() softwareIdInputChange = new EventEmitter<boolean>();

  //SelectedSoftware: any;
  //SelectedSoftwareVersion: any;
  //SoftwareVersionOptions: Set<string>;
  //FileredSoftwareOptions: any[] = [];
  //SelectedSoftwareData: any;

  softwareVersionsOptions: any[][] = [];
  SelectedSoftwaresData: any;
  FilteredSoftwaresOptions: any[][] = [];
  selectedSoftwareNames: any[] = [];
  selectedSoftwareVersions: any[] = [];
  softwareExpiryDate: any[] = [];
  softwares: any[] = [{}];
  devices: any[] = [{}];

  constructor(private assignDataManagementService: AssignDataManagementService,
    private formBuilder: FormBuilder,
) { }
  ngOnInit(): void {
    this.softwares = this.assignDataManagementService.getMultipleInstanceState('softwares') || [];
    if (this.softwares.length === 0) {
      this.softwares.push({});
    }
    this.SelectedSoftwaresData = this.assignDataManagementService.getMultipleInstanceState('SelectedSoftwaresData') || [];
    this.softwareVersionsOptions = this.assignDataManagementService.getMultipleInstanceState('SoftwareVersionsOptions') || [];
    this.FilteredSoftwaresOptions = this.assignDataManagementService.getMultipleInstanceState('FilteredSoftwaresOptions') || [];
    this.selectedSoftwareNames = this.assignDataManagementService.getMultipleInstanceState('softwareNames') || [];
    this.selectedSoftwareVersions = this.assignDataManagementService.getMultipleInstanceState('softwareVersions') || [];
    this.softwareExpiryDate = this.assignDataManagementService.getMultipleInstanceState('softwareExpiryDate') || [];
    this.devices = this.assignDataManagementService.getMultipleInstanceState('devices') || [];
  }

  ngOnDestroy(): void {
    this.assignDataManagementService.setMultipleInstanceState('SelectedSoftwaresData', this.SelectedSoftwaresData);
    this.assignDataManagementService.setMultipleInstanceState('SoftwareVersionOptions', this.softwareVersionsOptions);
    this.assignDataManagementService.setMultipleInstanceState('FilteredSoftwaresOptions', this.FilteredSoftwaresOptions);
    this.assignDataManagementService.setMultipleInstanceState('softwareNames', this.selectedSoftwareNames);
    this.assignDataManagementService.setMultipleInstanceState('softwareVersions', this.selectedSoftwareVersions);
    this.assignDataManagementService.setMultipleInstanceState('softwareExpiryDate', this.softwareExpiryDate);
    this.assignDataManagementService.setMultipleInstanceState('softwares', this.softwares);
  }
  softwareVersionSelected(): void {
    // Check that all SelectedLaptops are not null and have no assignedTo
    //const allSelected = this.SelectedLaptops.every(laptop => laptop !== null && !laptop.assignedTo);
    //console.log(allSelected, this.SelectedLaptops);
    //this.cygidInputChange.emit(!allSelected);
    //const isSoftwareIdEmpty = !this.SelectedSoftwareVersion || this.SelectedSoftwareVersion.id === null;
    //console.log(isSoftwareIdEmpty);
    //this.softwareIdInputChange.emit(isSoftwareIdEmpty);
  }

  SoftwareSearchBoxOptionSelected(event: any, index: number): void {
    this.selectedSoftwareNames[index] = event;
    this.filterSoftwareVersions(index);
  }

  filterSoftwareVersions(index: number): void {
    if (this.selectedSoftwareNames[index]) {
      this.FilteredSoftwaresOptions[index] = this.SoftwareOptions.filter(opt => opt.softwareName === this.selectedSoftwareNames[index]);
      console.log(this.FilteredSoftwaresOptions[index]);
      this.SelectedSoftwaresData[index] = this.FilteredSoftwaresOptions[index][0];
      //console.log(this.SelectedSoftwaresData[index]);
      const uniqueVersions: string[] = [];
      // Iterate over the filtered options and add their versions to the array
      this.FilteredSoftwaresOptions[index].forEach(option => {
        // Check if the version is not already present in the array
        if (!uniqueVersions.includes(option.version)) {
          uniqueVersions.push(option.version);
        }
      });
      // Assign the array to softwareVersionsOptions[index]
      this.softwareVersionsOptions[index] = uniqueVersions;
      //console.log(this.SoftwareOptions);
      console.log(this.softwareVersionsOptions[index]);
    }
    else {
      this.softwareVersionsOptions[index];
      }
  }
  SoftwareVersionSearchBoxOptionSelected(data: any): void {
    const selectedOption = data.option;
    const selectedIndex = data.index;
    const softwareIdsArray = this.assignAssetForm.get('softwareIds') as FormArray;
      const filteredOptions = this.FilteredSoftwaresOptions[selectedIndex].filter(
        (option: any) => option.version === selectedOption && option.assignedTo === null
      );
      const sameSoftwareIdInstances = this.selectedSoftwareVersions.filter(
        (version: any) => version && version.id === selectedOption.id
      );
      const numberOfInstances = sameSoftwareIdInstances.length;
      if (numberOfInstances < filteredOptions.length && filteredOptions.length > 0) {
        this.selectedSoftwareVersions[selectedIndex] = filteredOptions[0];
        softwareIdsArray.push(this.formBuilder.group({
          index: selectedIndex,
          softwareId: this.selectedSoftwareVersions[selectedIndex].id
        }));
        this.formatExpiryDate(selectedIndex);
      }
      //else if () {

      //}
      else {
        if (filteredOptions.length == 0)
          this.selectedSoftwareVersions[selectedIndex] = 1;
        else
          this.selectedSoftwareVersions[selectedIndex] = null;
        const index = softwareIdsArray.controls.findIndex(control => control.value.index === selectedIndex);
        if (index !== -1) {
          softwareIdsArray.removeAt(index);
        }
    }
    this.softwareVersionSelected();
  }

  formatExpiryDate(index: any): void {
    if (!this.selectedSoftwareVersions[index].expiryDate) {
      this.softwareExpiryDate[index] = '';
      return;
    }
    const date = new Date(this.selectedSoftwareVersions[index].expiryDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    this.softwareExpiryDate[index]= `${day}-${month}-${year}`;
  }
  addNewSoftware(): void {
    this.softwares.push({});
    this.selectedSoftwareNames.push(null);
    this.selectedSoftwareVersions.push(null);
    this.softwareExpiryDate.push(null);
    this.SelectedSoftwaresData.push(null);
    this.softwareVersionSelected();
  }

  removeSoftware(index: number): void {
    this.softwares.splice(index, 1);
    this.selectedSoftwareNames.splice(index, 1);
    this.selectedSoftwareVersions.splice(index, 1);
    this.softwareExpiryDate.splice(index, 1);
    this.SelectedSoftwaresData.splice(index, 1);
    this.softwareVersionSelected();
  }
}
