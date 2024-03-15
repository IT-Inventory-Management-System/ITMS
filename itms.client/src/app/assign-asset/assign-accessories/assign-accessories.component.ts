import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';
import { CloseFlagService } from '../../shared/services/close-flag.service';
import { SelectedCountryService } from '../../shared/services/selected-country.service';
import { DataService } from '../../shared/services/data.service';
import { DeviceAssignService } from '../../shared/services/device-assign.service';


@Component({
  selector: 'app-assign-accessories',
  templateUrl: './assign-accessories.component.html',
  styleUrls: ['./assign-accessories.component.css']
})
export class AssignAccessoriesComponent {
  selectedId: any[] = [];
  selectedCygid: string = '';

  @Input() accessCYGIDs: { accessCYGID: string, index: number }[] = [];
  @Input() AccessoryOptions: any[] = [];
  @Input() assignAssetForm: FormGroup;
  @Output() accessoryIdInputChange = new EventEmitter<any>();
  locationId: any;
  accessories: any[] = [{}];
  SelectedAccessoriesName: any[] = [];
  //SelectedAccessories: any[] = [];
  SelectedBrands: any[] = [];
  BrandOptions: any[][] = [];
  SelectedAccessoriesData: any[] = [];
  FilteredAccessoryOptions: any[][] = [];
  wire: any[] = [];
  closeFlagSubscription: any;
  AccessoryBrands: any[] = [];
  uniqueBrandsArray: any[] = [];
  selectedBrand: any;
  isWired: any;
  //selectedCygid: string = '';
  //commentText: any[] = [];
  selectedIds: any[] = [];
  uniqueBrandsArrays: any[][] = [];

  removeAccessoryButtonClicked: boolean = false;



  constructor(private assignDataManagementService: AssignDataManagementService,
    private formBuilder: FormBuilder,
    private closeFlagService: CloseFlagService,
    private selectedCountryService: SelectedCountryService,
    private dataService: DataService,
    private deviceAssignService: DeviceAssignService) {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe(flag => {
      if (flag) {
        this.accessories = [{}];
        //this.commentText = [];
      }
    });
  }
  ngOnInit(): void {
    this.initializeSelectedIds();


    //console.log(this.AccessoryOptions);
    this.accessories = this.assignDataManagementService.getMultipleInstanceState('accessoriesState') || [];
    if (this.accessories.length === 0) {
      this.accessories.push({});
    }
    this.SelectedAccessoriesName = this.assignDataManagementService.getMultipleInstanceState('accessoryNamesState') || [];
    this.SelectedBrands = this.assignDataManagementService.getMultipleInstanceState('accessoryBrandsState') || [];
    this.wire = this.assignDataManagementService.getMultipleInstanceState('wireState') || [];
    this.BrandOptions = this.assignDataManagementService.getMultipleInstanceState('BrandOptions') || [];
    this.FilteredAccessoryOptions = this.assignDataManagementService.getMultipleInstanceState('FilteredAccessoryOptions') || [];
    this.SelectedAccessoriesData = this.assignDataManagementService.getMultipleInstanceState('SelectedAccessoriesData') || [];
    //this.SelectedAccessories = this.assignDataManagementService.getMultipleInstanceState('SelectedAccessories') || [];
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.getDeviceLocation();
    });

    //const accessoryComments = this.assignAssetForm.get('accessoryComments') as FormArray;

    //if (accessoryComments) {
    //  accessoryComments.controls.forEach((control, index) => {
    //    const commentControl = control.get('accessoryComment');
    //    if (commentControl)
    //      this.commentText[index] = commentControl.value;
    //  });
    //} else {
    //  this.commentText = [];
    //}
  }

  initializeSelectedIds(): void {
    this.selectedId = new Array(this.accessories.length).fill(null);
  }

  ngOnDestroy(): void {
    this.assignDataManagementService.setMultipleInstanceState('accessoryNamesState', this.SelectedAccessoriesName);
    this.assignDataManagementService.setMultipleInstanceState('accessoryBrandsState', this.SelectedBrands);
    this.assignDataManagementService.setMultipleInstanceState('wireState', this.wire);
    this.assignDataManagementService.setMultipleInstanceState('BrandOptions', this.BrandOptions);
    this.assignDataManagementService.setMultipleInstanceState('FilteredAccessoryOptions', this.FilteredAccessoryOptions);
    this.assignDataManagementService.setMultipleInstanceState('accessoriesState', this.accessories);
    this.assignDataManagementService.setMultipleInstanceState('SelectedAccessoriesData', this.SelectedAccessoriesData);
    //this.assignDataManagementService.setMultipleInstanceState('SelectedAccessories', this.SelectedAccessories);
    this.closeFlagSubscription.unsubscribe();
  }
  accessoryIdInputChangeFlag(): void {
    const allSelected = this.SelectedAccessoriesName.every(accessory => accessory !== null) &&
      this.SelectedBrands.every(brand => brand !== null);;
    this.accessoryIdInputChange.emit({ allSelected: !allSelected, accessCYGIDs: this.accessCYGIDs });
  }

  AccessorySearchBoxOptionSelected(event: any, index: number): void {
    //console.log("getAccessoriesDetails is called here");
    //console.log("AccessCygids", this.accessCYGIDs);
    
    if (event != null) {
      this.selectedId[index] = event.selectedOption;
      this.accessCYGIDs = event.accessCYGIDs;

      this.getAccessoriesDetails(index, this.accessCYGIDs);
      this.SelectedAccessoriesName[index] = event.option;
      this.filterAccessoryBrands(index);
    }
  }
  filterAccessoryBrands(index: number): void {
    if (this.SelectedAccessoriesName[index]) {
      this.FilteredAccessoryOptions[index] = this.AccessoryOptions.filter(opt => opt.name === this.SelectedAccessoriesName[index]);
      //console.log(this.FilteredAccessoryOptions[index]);
      const uniqueVersions: string[] = [];
      this.FilteredAccessoryOptions[index].forEach(option => {
        if (!uniqueVersions.includes(option.brand)) {
          uniqueVersions.push(option.brand);
        }
      });
      this.BrandOptions[index] = uniqueVersions;
      //console.log(this.BrandOptions[index]);
    }
    else {
      this.BrandOptions[index];
    }
  }
  /*
  1)filter as per brand and show the first one that is available else alert
  2) filter that out of FilteredAccessoryOptions into an array of selectedAccessories
  3) 
  4) when removed should be pushed back to FilteredAccessoryOptions 
   */
  AccessoryBrandSearchBoxOptionSelected(data: any, index: number): void {
    if (data != null) {
      this.selectedBrand = data.option;
      this.selectedIds[index] = data;
      const selectedOption = data;
      const selectedIndex = index;
      const accessoryIdsArray = this.assignAssetForm.get('accessoryIds') as FormArray;
      if (this.selectedIds[index]) {

      }

      //this.AccessoryBrands = data.AccessoryBrands;

      this.accessCYGIDs = data.accessCYGIDs
      //console.log("accessCYGIDs", this.accessCYGIDs);
      this.selectedCygid = data.cygid

      this.getAccessoriesDetails(index, this.accessCYGIDs);
    }
    //const filteredOptions = this.FilteredAccessoryOptions[selectedIndex].filter(
    //  (option: any) => option.version === selectedOption && option.assignedTo === null
    //);
    //if (filteredOptions.length > 0) {
    //  this.SelectedAccessoriesData[index] = filteredOptions[0];
    //  this.SelectedBrands[selectedIndex] = filteredOptions[0];
    //  //filter both all existing for same accessoryname in FilteredAccessoryOptions[i] & AccessoryOptions
    //  for (let i = 0; i < this.FilteredAccessoryOptions.length; i++) {
    //    this.FilteredAccessoryOptions[i] = this.FilteredAccessoryOptions[i].filter(opt => opt.id !== (this.SelectedBrands[selectedIndex]?.id));
    //  }
    //  this.AccessoryOptions = this.AccessoryOptions.filter(opt => opt.id! == (this.SelectedBrands[selectedIndex]?.id));
    //  //this.FilteredAccessoryOptions[selectedIndex] = this.FilteredAccessoryOptions[selectedIndex].filter(opt => opt.id !== this.SelectedBrands[selectedIndex].id);
    //  accessoryIdsArray.push(this.formBuilder.group({
    //    index: selectedIndex,
    //    accessoryId: this.SelectedBrands[selectedIndex].id
    //  }));
    //}
    //else {
    //  if (filteredOptions.length == 0)
    //    this.SelectedBrands[selectedIndex] = 1;
    //  else
    //  {
    //    for (let i = 0; i < this.FilteredAccessoryOptions.length; i++) {
    //      if (this.FilteredAccessoryOptions[i].length > 0 && this.FilteredAccessoryOptions[i][0]?.name === this.SelectedBrands[i]?.name) 
    //          this.FilteredAccessoryOptions[i].push(this.SelectedBrands[selectedIndex]);
    //    }
    //    this.AccessoryOptions.push(this.SelectedBrands[selectedIndex]);
    //    this.SelectedBrands[selectedIndex] = null;
    //    const index = accessoryIdsArray.controls.findIndex(control => control.value.index === selectedIndex);
    //    if (index !== -1) {
    //      accessoryIdsArray.removeAt(index);
    //    }
    //  }
    //}
    //this.accessoryIdInputChangeFlag();
  }

  addNewAccessory(data: any): void {
    //this.accessCYGIDs = data.accessCYGIDs;
    this.accessories.push({});
    this.SelectedAccessoriesName.push(null);
    this.wire.push(null);
    //this.SelectedAccessories.push(null);
    this.SelectedBrands.push(null);
    this.accessoryIdInputChangeFlag();
    //this.AccessoryBrands = data.AccessoryBrands;
    //console.log("AccessoryBrands from add another", this.AccessoryBrands);
  }

  removeAccessory(data: any): void {
    this.selectedId[data.index] = data.selectedId;
    this.accessCYGIDs = data.accessCYGIDs;
    if (this.selectedCygid != '') {
      const index = this.accessCYGIDs.findIndex(item => item.accessCYGID === this.selectedCygid);
      //const index = this.accessCYGIDs.indexOf(this.selectedCygid);
      if (index !== -1) {
        this.accessCYGIDs.splice(index, 1);
      }
    }

    if (this.SelectedBrands[data.index] && !this.FilteredAccessoryOptions[data.index].includes(this.SelectedBrands[data.index])) {
      this.FilteredAccessoryOptions[data.index].push(this.SelectedBrands[data.index]);
    }
    this.accessories.splice(data.index, 1);
    this.wire.splice(data.index, 1);
    //this.SelectedAccessories.splice(index, 1);
    this.SelectedAccessoriesName.splice(data.index, 1);
    this.SelectedBrands.splice(data.index, 1);
    this.accessoryIdInputChangeFlag();
    this.accessCYGIDs = data.accessCYGIDs;

    this.removeAccessoryButtonClicked = !this.removeAccessoryButtonClicked;

    //this.commentText.splice(index, 1);
    //const accessoryCommentsArray = this.assignAssetForm.get('accessoryComments') as FormArray;
    //const i = accessoryCommentsArray.controls.findIndex(control => control.value.index === index);
    //if (i !== -1) {
    //  accessoryCommentsArray.removeAt(i);
    //  for (let j = index; j < accessoryCommentsArray.length; j++) {
    //    const accessoryCommentsControl = accessoryCommentsArray.controls[j] as FormGroup;
    //    accessoryCommentsControl.patchValue({ index: j }); // Update the index in the form array control
    //  }
    //}
  }

  getAccessoriesDetails(index: number, accessCYGIDs: { accessCYGID: string, index: number }[]) {

    const input = {
      categoryName: this.selectedId[index],
      locationId: this.locationId
    }
      this.deviceAssignService.getAccessoriesDetails(input).subscribe(
        (data: any[]) => {
          this.AccessoryBrands = data;
          //this.AccessoryBrands = data.filter(brand => !accessCYGIDs.includes(brand.cygid));
          this.AccessoryBrands = data.filter(brand => !accessCYGIDs.some(item => item.accessCYGID === brand.cygid));

          this.AccessoryBrands = this.AccessoryBrands.map(brand => ({ ...brand, count: 1 }));
          const uniqueBrandsSet = new Set(this.AccessoryBrands.map(item => item.brand));
          this.uniqueBrandsArray = Array.from(uniqueBrandsSet);


          //console.log("getAllAcc executed", this.AccessoryBrands);
        },
        (error: any) => {
          console.error('Error fetching accessory brand', error);
        }
      );
  }

  getDeviceLocation() {
    this.dataService.getLocation().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == localStorage.getItem('selectedCountry')) {
            if (this.locationId !== data[i].id) { 
              this.locationId = data[i].id;
              if (this.selectedId != null) {
                //this.getAccessoriesDetails();
              }
            }
            break;
          }
        }
      },
      (error) => {
        //console.log("User not found");
      });
  }


  //setNewAccessoryId() {
  //  const selectedBrand = this.selectedBrand;
  //  const isWired = this.isWired == 'true'?true:false;

  //  const filteredBrands = this.AccessoryBrands.filter(
  //    accessory => accessory.brand === selectedBrand && accessory.iswired === isWired
  //  );

  //  if (filteredBrands.length > 0) {
  //    const selectedCygid = filteredBrands[0].cygid;
  //    this.selectedCygid = selectedCygid;
  //  } else {
  //    this.selectedCygid = 'Not found';
  //  }

  //  if (this.selectedCygid != 'Not found') {
  //    const accessoryIdsArray = this.assignAssetForm.get('accessoryIds') as FormArray;
  //    accessoryIdsArray.push(this.formBuilder.group({
  //      index: 0,
  //      accessoryId: this.selectedCygid
  //    }));
  //  }
    
    
  //}

  /**  COMMENT   **/
  //onInputChangeCommentBox(event: any, index: any): void {
  //  this.commentText[index] = event.target.value;
  //  const accessoryCommentsArray = this.assignAssetForm.get('accessoryComments') as FormArray;
  //  if (accessoryCommentsArray) {
  //    const controlIndex = accessoryCommentsArray.controls.findIndex(control => control.get('index')?.value === index);
  //    if (controlIndex !== -1) {
  //      accessoryCommentsArray.controls[controlIndex].get('accessoryComments')?.setValue(event.target.value);
  //    } else {
  //      accessoryCommentsArray.push(this.formBuilder.group({
  //        index: index,
  //        accessoryComment: event.target.value
  //      }));
  //    }
  //    console.log(accessoryCommentsArray);
  //  } else {
  //    console.error('FormArray "accessoryComments" is null.');
  //  }
  //}
} 
