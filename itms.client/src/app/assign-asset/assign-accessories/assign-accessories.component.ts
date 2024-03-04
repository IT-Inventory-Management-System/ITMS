import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';
import { CloseFlagService } from '../../shared/services/close-flag.service';


@Component({
  selector: 'app-assign-accessories',
  templateUrl: './assign-accessories.component.html',
  styleUrls: ['./assign-accessories.component.css']
})
export class AssignAccessoriesComponent {
  selectedId: any;
  @Input() AccessoryOptions: any[] = [];
  @Input() assignAssetForm: FormGroup;
  @Output() accessoryIdInputChange = new EventEmitter<boolean>();

  accessories: any[] = [{}];
  SelectedAccessoriesName: any[] = [];
  //SelectedAccessories: any[] = [];
  SelectedBrands: any[] = [];
  BrandOptions: any[][] = [];
  SelectedAccessoriesData: any[] = [];
  FilteredAccessoryOptions: any[][] = [];
  wire: any[] = [];
  closeFlagSubscription: any;

  constructor(private assignDataManagementService: AssignDataManagementService,
    private formBuilder: FormBuilder,
    private closeFlagService: CloseFlagService) {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe(flag => {
      if (flag) {
        this.accessories = [{}];
      }
    });
  }
  ngOnInit(): void {
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
    this.accessoryIdInputChange.emit(!allSelected);
  }

  AccessorySearchBoxOptionSelected(event: any, index: number): void {
    this.selectedId = event; 
    this.SelectedAccessoriesName[index] = event;
    this.filterAccessoryBrands(index);
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
      console.log(this.BrandOptions[index]);
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
    const selectedOption = data;
    const selectedIndex = index;
    const accessoryIdsArray = this.assignAssetForm.get('accessoryIds') as FormArray;
    const filteredOptions = this.FilteredAccessoryOptions[selectedIndex].filter(
      (option: any) => option.version === selectedOption && option.assignedTo === null
    );
    if (filteredOptions.length > 0) {
      this.SelectedAccessoriesData[index] = filteredOptions[0];
      this.SelectedBrands[selectedIndex] = filteredOptions[0];
      //filter both all existing for same accessoryname in FilteredAccessoryOptions[i] & AccessoryOptions
      for (let i = 0; i < this.FilteredAccessoryOptions.length; i++) {
        this.FilteredAccessoryOptions[i] = this.FilteredAccessoryOptions[i].filter(opt => opt.id !== (this.SelectedBrands[selectedIndex]?.id));
      }
      this.AccessoryOptions = this.AccessoryOptions.filter(opt => opt.id! == (this.SelectedBrands[selectedIndex]?.id));
      //this.FilteredAccessoryOptions[selectedIndex] = this.FilteredAccessoryOptions[selectedIndex].filter(opt => opt.id !== this.SelectedBrands[selectedIndex].id);
      accessoryIdsArray.push(this.formBuilder.group({
        index: selectedIndex,
        accessoryId: this.SelectedBrands[selectedIndex].id
      }));
    }
    else {
      if (filteredOptions.length == 0)
        this.SelectedBrands[selectedIndex] = 1;
      else
      {
        for (let i = 0; i < this.FilteredAccessoryOptions.length; i++) {
          if (this.FilteredAccessoryOptions[i].length > 0 && this.FilteredAccessoryOptions[i][0]?.name === this.SelectedBrands[i]?.name) 
              this.FilteredAccessoryOptions[i].push(this.SelectedBrands[selectedIndex]);
        }
        this.AccessoryOptions.push(this.SelectedBrands[selectedIndex]);
        this.SelectedBrands[selectedIndex] = null;
        const index = accessoryIdsArray.controls.findIndex(control => control.value.index === selectedIndex);
        if (index !== -1) {
          accessoryIdsArray.removeAt(index);
        }
      }
    }
    this.accessoryIdInputChangeFlag();
  }

  addNewAccessory(): void {
    this.accessories.push({});
    this.SelectedAccessoriesName.push(null);
    this.wire.push(null);
    //this.SelectedAccessories.push(null);
    this.SelectedBrands.push(null);
    this.accessoryIdInputChangeFlag();
  }

  removeAccessory(index: number): void {
    if (this.SelectedBrands[index] && !this.FilteredAccessoryOptions[index].includes(this.SelectedBrands[index])) {
      this.FilteredAccessoryOptions[index].push(this.SelectedBrands[index]);
    }
    this.accessories.splice(index, 1);
    this.wire.splice(index, 1);
    //this.SelectedAccessories.splice(index, 1);
    this.SelectedAccessoriesName.splice(index, 1);
    this.SelectedBrands.splice(index, 1);
    this.accessoryIdInputChangeFlag();
  }
} 
