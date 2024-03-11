import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';
import { CloseFlagService } from '../../shared/services/close-flag.service';

@Component({
  selector: 'app-assign-software',
  templateUrl: './assign-software.component.html',
  styleUrls: ['./assign-software.component.css']
})
export class AssignSoftwareComponent {
  @Input() SoftwareOptions: any[] = [];
  @Input() assignAssetForm: FormGroup;
  @Output() softwareIdInputChange = new EventEmitter<{ allSelected: boolean, SoftwareOptions: any[] }>();


  //SelectedSoftware: any;
  //SelectedSoftwareVersion: any;
  //SoftwareVersionOptions: Set<string>;
  //FileredSoftwareOptions: any[] = [];
  //SelectedSoftwareData: any;

  softwareVersionsOptions: any[][] = [];
  SelectedSoftwaresData: any[]=[];
  FilteredSoftwaresOptions: any[][] = [];
  selectedSoftwareNames: any[] = [];
  selectedSoftwareVersions: any[] = [];
  softwareExpiryDate: any[] = [];
  softwares: any[] = [{}];
  closeFlagSubscription: any;

  selectedOptionDisable: boolean = false;

  softwareWarning: boolean = false;


  currSelectedSoftware: string = '';


  constructor(private assignDataManagementService: AssignDataManagementService,
    private formBuilder: FormBuilder,
    private closeFlagService: CloseFlagService) {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe(flag => {
      if (flag) {
        this.softwares=[{}];
        this.selectedSoftwareNames = [];
        this.selectedSoftwareVersions = [];
        this.softwareExpiryDate =[];
        this.SelectedSoftwaresData = [];
      }
    });
  }
  ngOnInit(): void {
    console.log("software-oninit", this.SoftwareOptions);
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
  }

  ngOnDestroy(): void {
    this.assignDataManagementService.setMultipleInstanceState('SelectedSoftwaresData', this.SelectedSoftwaresData);
    this.assignDataManagementService.setMultipleInstanceState('SoftwareVersionsOptions', this.softwareVersionsOptions);
    this.assignDataManagementService.setMultipleInstanceState('FilteredSoftwaresOptions', this.FilteredSoftwaresOptions);
    this.assignDataManagementService.setMultipleInstanceState('softwareNames', this.selectedSoftwareNames);
    this.assignDataManagementService.setMultipleInstanceState('softwareVersions', this.selectedSoftwareVersions);
    this.assignDataManagementService.setMultipleInstanceState('softwareExpiryDate', this.softwareExpiryDate);
    this.assignDataManagementService.setMultipleInstanceState('softwares', this.softwares);
  }
  softwareIdInputChangeFlag(): void {
    // Check that all SelectedLaptops are not null and have no assignedTo
    //const allSelected = this.SelectedLaptops.every(laptop => laptop !== null && !laptop.assignedTo);
    //console.log(allSelected, this.SelectedLaptops);
    //this.cygidInputChange.emit(!allSelected);
    //const isSoftwareIdEmpty = !this.SelectedSoftwareVersion || this.SelectedSoftwareVersion.id === null;
    //console.log(isSoftwareIdEmpty);
    //this.softwareIdInputChange.emit(isSoftwareIdEmpty);
      const allSelected = this.selectedSoftwareNames.every(name => name !== null) &&
      this.selectedSoftwareVersions.every(version => version !== null && version !== 1);
      console.log(allSelected);
    this.softwareIdInputChange.emit({ allSelected, SoftwareOptions: this.SoftwareOptions });
  }

  SoftwareSearchBoxOptionSelected(event: any, index: number): void {
    this.selectedSoftwareNames[index] = event;
    this.currSelectedSoftware = this.selectedSoftwareNames[index];
    console.log("this.currSelectedSoftware", this.currSelectedSoftware);
    this.filterSoftwareVersions(index);
  }

  filterSoftwareVersions(index: number): void {
    if (this.selectedSoftwareNames[index]) {
      this.FilteredSoftwaresOptions[index] = this.SoftwareOptions.filter(opt => opt.softwareName === this.selectedSoftwareNames[index]);
      console.log("this.FilteredSoftwaresOptions[index]",this.FilteredSoftwaresOptions[index]);
      this.SelectedSoftwaresData[index] = this.FilteredSoftwaresOptions[index][0];
      const uniqueVersions: string[] = [];
      this.FilteredSoftwaresOptions[index].forEach(option => {
        if (!uniqueVersions.includes(option.version)) {
          uniqueVersions.push(option.version);
        }
      });
      this.softwareVersionsOptions[index] = uniqueVersions;
      console.log(this.softwareVersionsOptions[index]);
    }
    else {
      this.softwareVersionsOptions[index];
      }
  }
  //filter from FilteredSoftwaresOptions to add and remove from selectedSoftwareVersions
  SoftwareVersionSearchBoxOptionSelected(data: any, index: number): void {
    if (data.option != null) {
      this.selectedOptionDisable = true;
    } else {
      this.selectedOptionDisable = false;
    }
    //alert(this.selectedOptionDisable);
    const selectedOption = data.option;
    const selectedIndex = index;
    this.SoftwareOptions = data.SoftwareOptions;
    this.softwareWarning = data.countZero;
    const softwareIdsArray = this.assignAssetForm.get('softwareIds') as FormArray;

    //const filteredOptions = this.FilteredSoftwaresOptions[selectedIndex].filter(
    //  (option: any) => option.version === selectedOption && option.assignedTo === null
    //);

    const filteredOptions = this.FilteredSoftwaresOptions[selectedIndex].filter(
      (option: any) => option.version === selectedOption
    );

    console.log("filtered options", filteredOptions);

    if (data.option == undefined) {
      softwareIdsArray.push(this.formBuilder.group({
        index: selectedIndex,
        softwareId: filteredOptions[selectedIndex].id,
        softwareversion: data.option
      }));
    }

    //this.formatExpiryDate(selectedIndex);
    this.softwareIdInputChangeFlag();

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
    this.softwareIdInputChangeFlag();
  }

  removeSoftware(index: number): void {
    this.softwares.splice(index, 1);
    this.selectedSoftwareNames.splice(index, 1);
    this.selectedSoftwareVersions.splice(index, 1);
    this.softwareExpiryDate.splice(index, 1);
    this.SelectedSoftwaresData.splice(index, 1);
    this.softwareIdInputChangeFlag();
  }
}
