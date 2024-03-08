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
  @Output() softwareIdInputChange = new EventEmitter<boolean>();

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
  commentText: any[] = [];


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
        this.commentText = [];
      }
    });
  }
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
    const softwareCommentsArray = this.assignAssetForm.get('softwareComments') as FormArray;

    if (softwareCommentsArray) {
      softwareCommentsArray.controls.forEach((control, index) => {
        const commentControl = control.get('softwareComment');
        if (commentControl)
          this.commentText[index] = commentControl.value;
      });
    } else {
      this.commentText = [];
    }
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
      this.softwareIdInputChange.emit(allSelected);
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
    const selectedOption = data;
    const selectedIndex = index;
    const softwareIdsArray = this.assignAssetForm.get('softwareIds') as FormArray;

    const filteredOptions = this.FilteredSoftwaresOptions[selectedIndex].filter(
      (option: any) => option.version === selectedOption && option.assignedTo === null
    );

    softwareIdsArray.push(this.formBuilder.group({
      index: selectedIndex,
      softwareId: filteredOptions[selectedIndex].id,
      softwareversion: data
    }));

    this.formatExpiryDate(selectedIndex);
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
  /****  SEARCH BOX ******* */
//  import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
//import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';
//import { Subscription } from 'rxjs';
//import { CloseFlagService } from '../../shared/services/close-flag.service';

//@Component({
//  selector: 'app-software-search-box',
//  templateUrl: './software-search-box.component.html',
//  styleUrls: ['./software-search-box.component.css']
//})
//export class SoftwareSearchBoxComponent {
//  @Input() label: string;
//  @Input() placeholder: string;
//  @Input() SoftwareOptions: any[] = [];
//  @Input() index: number;
//  @Output() SoftwareOptionSelected: EventEmitter<any> = new EventEmitter();
//  @Output() removeSoftware = new EventEmitter<number>();
//  uniqueSoftwareNames: any[] = [];
//  selectedOption: any;
//  private closeFlagSubscription: Subscription;

//  constructor(private assignDataManagementService: AssignDataManagementService,
//    private closeFlagService: CloseFlagService
//  ) { }

//  ngOnInit(): void {
//    this.closeFlagService.setCloseFlagToFalse();
//    this.selectedOption = this.assignDataManagementService.getState("softwareNames", this.index);
//    this.SoftwareOptionSelected.emit(this.selectedOption);
//    this.UniqueOptions();
//  }

//  ngOnDestroy(): void {
//    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
//      if (!closeFlag) {
//        this.assignDataManagementService.setState("softwareNames", this.selectedOption, this.index);
//      }
//    });
//    this.closeFlagSubscription.unsubscribe();
//  }

//  onClearSelection(): void {
//    this.selectedOption = null;
//  }

//  UniqueOptions(): void {
//    const uniqueNamesSet = new Set<string>(this.SoftwareOptions.map(option => option.softwareName));
//    this.uniqueSoftwareNames = Array.from(uniqueNamesSet);
//  }

//  onSelectOption(option: any): void {
//    console.log(option);
//    this.SoftwareOptionSelected.emit(option);
//  }


//  emitRemoveSoftware(): void {
//    this.removeSoftware.emit(this.index);
//  }
//}


  /****  VERSION-SEARCH BOX ******* */
//import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
//import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
//import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';
//import { Subscription } from 'rxjs';
//import { CloseFlagService } from '../../shared/services/close-flag.service';

//@Component({
//  selector: 'app-software-version-search-box',
//  templateUrl: './software-version-search-box.component.html',
//  styleUrls: ['./software-version-search-box.component.css']
//})
//export class SoftwareVersionSearchBoxComponent {
//  @Input() label: string;
//  @Input() placeholder: string;
//  @Input() SoftwareVersionOptions: string[] = [];
//  @Input() assignAssetForm: FormGroup;
//  @Input() index: number;
//  @Output() SoftwareVersionOptionSelected: EventEmitter<any> = new EventEmitter();

//  selectedOption: any;
//  private closeFlagSubscription: Subscription;

//  constructor(private assignDataManagementService: AssignDataManagementService,
//    private formBuilder: FormBuilder,
//    private closeFlagService: CloseFlagService
//  ) { }

//  onSelectOption(option: any): void {
//    console.log(this.SoftwareVersionOptions);
//    this.SoftwareVersionOptionSelected.emit(option);
//  }
//  onClearSelection(): void {
//    this.selectedOption = null;
//    const softwareIdsArray = this.assignAssetForm.get('softwareIds') as FormArray;
//    const index = softwareIdsArray.controls.findIndex(control => control.value.index === this.index);
//    if (index !== -1) {
//      softwareIdsArray.removeAt(index);
//      this.selectedOption = null;
//    }
//    const data = { option: null, index: this.index };
//    this.SoftwareVersionOptionSelected.emit(data);
//  }

//  ngOnInit(): void {
//    this.closeFlagService.setCloseFlagToFalse();
//    this.selectedOption = this.assignDataManagementService.getState("softwareVersions", this.index);
//    if (this.selectedOption)
//      this.SoftwareVersionOptionSelected.emit(this.selectedOption);
//  }
//  ngOnDestroy(): void {
//    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
//      if (!closeFlag) {
//        this.assignDataManagementService.setState("softwareVersions", this.selectedOption, this.index);
//      }
//    });
//    this.closeFlagSubscription.unsubscribe();
//  }
//}




  /******COMMENT******/
  onInputChangeCommentBox(event: any, index: any): void {
    this.commentText[index] = event.target.value;
    const softwareCommentsArray = this.assignAssetForm.get('softwareComments') as FormArray;

    if (softwareCommentsArray) {
      const controlIndex = softwareCommentsArray.controls.findIndex(control => control.get('index')?.value === index);
      if (controlIndex !== -1) {
        softwareCommentsArray.controls[controlIndex].get('softwareComments')?.setValue(event.target.value);
      } else {
        softwareCommentsArray.push(this.formBuilder.group({
          index: index,
          softwareComment: event.target.value
        }));
        console.log(softwareCommentsArray);
      }
    } else {
      console.error('FormArray "softwareComments" is null.');
    }
  }
}
