import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';
import { Subscription } from 'rxjs';
import { CloseFlagService } from '../../shared/services/close-flag.service';
import { DeviceAssignService } from '../../shared/services/device-assign.service';
import { SelectedCountryService } from '../../shared/services/selected-country.service';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-accessory-brandy-search-box',
  templateUrl: './accessory-brandy-search-box.component.html',
  styleUrls: ['./accessory-brandy-search-box.component.css']
})
export class AccessoryBrandySearchBoxComponent {
  prev: string = '';
  @Input() accessCYGIDs: { accessCYGID: string, index: number }[] = [];
  @Input() AccessoryOptions: any;
  @Input() selectedId: any;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() AccessoryBrandOptions: any[] = [];
  @Input() assignAssetForm: FormGroup;
  @Input() index: number;
  @Input() AccessoriesSize: number;
  @Output() AccessoryBrandOptionSelected: EventEmitter<any> = new EventEmitter();
  @Output() AddNewAccessory: EventEmitter<any> = new EventEmitter();
  locationId: any;
  @Input() uniqueBrandsArray: any[] = [];
  selectedOption: any;
  private closeFlagSubscription: Subscription;
  @Input() AccessoryBrands: any;
  selectedCygid: string = '';
  isWired: any;
  selectedBrand: any;
  commentText: any[] = [];
  selectedIds: any[] = [];


  constructor(private assignDataManagementService: AssignDataManagementService,
    private formBuilder: FormBuilder,
    private closeFlagService: CloseFlagService,
    private deviceAssignService: DeviceAssignService,
    private selectedCountryService: SelectedCountryService,
    private dataService: DataService
  ) {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe(flag => {
      if (flag) {
        this.commentText = [];
      }
    });
  }


  setNewAccessoryId() {
    const selectedBrand = this.selectedBrand;
    const isWired = this.isWired == 'true' ? true : false;

    const filteredBrands = this.AccessoryBrands.filter(
      (accessory: any) => accessory.brand === selectedBrand && accessory.iswired === isWired
    );

    console.log("this.AccessoryBrands", this.AccessoryBrands);

    console.log("filteredBrands", filteredBrands);

    if (filteredBrands.length > 0) {
      const selectedCygid = filteredBrands[0].cygid;
      //const indexToUpdate = this.AccessoryBrands.findIndex((accessory: any) => accessory.cygid === selectedCygid);

      //if (indexToUpdate !== -1) {
      //  this.AccessoryBrands[indexToUpdate].count = 0;
      //}
      this.selectedCygid = selectedCygid;
      if (this.prev !== '') {
        const prevIndex = this.accessCYGIDs.findIndex(item => item.accessCYGID === this.prev);
        if (prevIndex !== -1) {
          this.accessCYGIDs.splice(prevIndex, 1);
        }
      }
      this.accessCYGIDs.push({ accessCYGID: this.selectedCygid, index: this.index });


      this.prev = selectedCygid;
      console.log(this.accessCYGIDs);
    } else {
      this.selectedCygid = 'Not found';
    }

    if (this.selectedCygid != 'Not found') {
      const accessoryIdsArray = this.assignAssetForm.get('accessoryIds') as FormArray;
      accessoryIdsArray.push(this.formBuilder.group({
        index: this.index,
        accessoryId: this.selectedCygid
      }));
    }

    this.AccessoryBrandOptionSelected.emit({ AccessoryBrands: this.AccessoryBrands, accessCYGIDs: this.accessCYGIDs, cygid: this.selectedCygid });
  }




  onSelectOption(option: any): void {
    if (option) {
      //console.log("SELECTED OPTION", this.selectedId);
      //console.log("HELLO WHEN OPTION SELECTED",this.AccessoryBrandOptions);
      const data = { option: option, index: this.index };
      //alert(option);
      //console.log(option);
      this.selectedBrand = option;
      if (this.selectedCygid != '') {
        const index = this.accessCYGIDs.findIndex(item => item.accessCYGID === this.selectedCygid);
        //const index = this.accessCYGIDs.indexOf(this.selectedCygid);
        if (index !== -1) {
          this.accessCYGIDs.splice(index, 1);
        }
      }
      
      //this.AccessoryBrandOptionSelected.emit(data);
      if (option.name != "Mouse" || option.name != "Keyboard" || option.name != "Combo") {
        const accessoryIdsArray = this.assignAssetForm.get('accessoryIds') as FormArray;
        accessoryIdsArray.push(this.formBuilder.group({
          index: this.index,
          accessoryId: this.selectedCygid
        }));
      }
      this.isWired = null;
      this.selectedCygid = '';
      const dataPass = { accessCYGIDs: this.accessCYGIDs, index: this.index, cygid: this.selectedCygid };
      this.AccessoryBrandOptionSelected.emit(dataPass);
      if (this.selectedId !== 'Mouse' && this.selectedId !== 'Keyboard' && this.selectedId !== 'Combo') {
        alert(this.selectedId);
        this.selectCygId();
      }
    }
  }

  selectCygId() {
    const selectedBrand = this.selectedBrand;

    const filteredBrands = this.AccessoryBrands.filter(
      (accessory: any) => accessory.brand === selectedBrand
    );

    //console.log("this.AccessoryBrands", this.AccessoryBrands);

    //console.log("filteredBrands", filteredBrands);

    if (filteredBrands.length > 0) {
      const selectedCygid = filteredBrands[0].cygid;
      //const indexToUpdate = this.AccessoryBrands.findIndex((accessory: any) => accessory.cygid === selectedCygid);

      //if (indexToUpdate !== -1) {
      //  this.AccessoryBrands[indexToUpdate].count = 0;
      //}
      this.selectedCygid = selectedCygid;
      if (this.prev !== '') {
        const index = this.accessCYGIDs.findIndex(item => item.accessCYGID === this.prev);
        //const index = this.accessCYGIDs.indexOf(this.prev);
        if (index !== -1) {
          this.accessCYGIDs.splice(index, 1);
        }
      }
      this.accessCYGIDs.push({ accessCYGID: this.selectedCygid ,index:this.index});

      this.prev = selectedCygid;
      //console.log(this.accessCYGIDs);
    } else {
      this.selectedCygid = 'Not found';
    }

    if (this.selectedCygid != 'Not found') {
      const accessoryIdsArray = this.assignAssetForm.get('accessoryIds') as FormArray;
      accessoryIdsArray.push(this.formBuilder.group({
        index: this.index,
        accessoryId: this.selectedCygid
      }));
    }

    this.AccessoryBrandOptionSelected.emit({ AccessoryBrands: this.AccessoryBrands, accessCYGIDs: this.accessCYGIDs, cygid: this.selectedCygid });
  }

  onClearSelection(): void {
    

    if (this.selectedCygid != '') {
      const index = this.accessCYGIDs.findIndex(item => item.accessCYGID === this.selectedCygid);
      //const index = this.accessCYGIDs.indexOf(this.selectedCygid);
      if (index !== -1) {
        this.accessCYGIDs.splice(index, 1);
      }
    }
    this.selectedOption = null;
    const accessoryIdsArray = this.assignAssetForm.get('accessoryIds') as FormArray;
    const index = accessoryIdsArray.controls.findIndex(control => control.value.index === this.index);
    if (index !== -1) {
      accessoryIdsArray.removeAt(index);
      this.selectedOption = null;
    }
    this.isWired = null;
    this.selectedCygid = '';
    this.prev = '';
    const data = { accessCYGIDs: this.accessCYGIDs, index: this.index, cygid: this.selectedCygid };
    this.AccessoryBrandOptionSelected.emit(data);
  }

  ngOnInit(): void {
    //this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
    //  localStorage.setItem('selectedCountry', selectedCountry);
    //  this.getDeviceLocation();
    //});
    //if (this.selectedId == null) {
      this.selectedOption = null;
      this.isWired = null;
      this.selectedCygid = '';
    //}

    this.prev = '';


    this.closeFlagService.setCloseFlagToFalse();
    this.selectedOption = this.assignDataManagementService.getState("accessoriesBrand", this.index);
    //if (this.selectedOption)
    //  this.AccessoryBrandOptionSelected.emit(this.selectedOption);
    const accessoryComments = this.assignAssetForm.get('accessoryComments') as FormArray;

    if (accessoryComments) {
      accessoryComments.controls.forEach((control, index) => {
        const commentControl = control.get('accessoryComment');
        if (commentControl)
          this.commentText[index] = commentControl.value;
      });
    } else {
      this.commentText = [];
    }
  }
  ngOnDestroy(): void {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
      if (!closeFlag) {
        this.assignDataManagementService.setState("accessoriesBrand", this.selectedOption, this.index);
      }
    });
    this.closeFlagSubscription.unsubscribe();
  }

  //ngOnChanges() {

  //  if (this.selectedId != null)
  //    this.getAccessoriesDetails();
  //}

  //getAccessoriesDetails() {

  //  const input = {
  //    categoryName: this.selectedId,
  //    locationId: this.locationId
  //  }

  //  this.deviceAssignService.getAccessoriesDetails(input).subscribe(
  //    (data: any[]) => {
  //      this.AccessoryBrands = data;
  //      const uniqueBrandsSet = new Set(this.AccessoryBrands.map(item => item.brand));
  //      this.uniqueBrandsArray = Array.from(uniqueBrandsSet);

  //      console.log(this.AccessoryBrands);
  //    },
  //    (error: any) => {
  //      console.error('Error fetching accessory brand', error);
  //    }
  //  );
  //}

  //getDeviceLocation() {
  //  this.dataService.getLocation().subscribe(
  //    (data) => {
  //      for (var i = 0; i < data.length; i++) {
  //        if (data[i].type == localStorage.getItem('selectedCountry')) {
  //          this.locationId = data[i].id;
  //          if (this.selectedId != null)
  //            this.getAccessoriesDetails();
  //          break;
  //        }
  //      }
  //    },
  //    (error) => {
  //      console.log("User not found");
  //    });
  //}


  /**  COMMENT   **/
  onInputChangeCommentBox(event: any, index: any): void {
    this.commentText[index] = event.target.value;
    const accessoryCommentsArray = this.assignAssetForm.get('accessoryComments') as FormArray;
    if (accessoryCommentsArray) {
      const controlIndex = accessoryCommentsArray.controls.findIndex(control => control.get('index')?.value === index);
      if (controlIndex !== -1) {
        accessoryCommentsArray.controls[controlIndex].get('accessoryComments')?.setValue(event.target.value);
      } else {
        accessoryCommentsArray.push(this.formBuilder.group({
          index: index,
          accessoryComment: event.target.value
        }));
      }
      //console.log(accessoryCommentsArray);
    } else {
      console.error('FormArray "accessoryComments" is null.');
    }
  }


  addNewAccessory() {
    this.AddNewAccessory.emit();
  }

}
