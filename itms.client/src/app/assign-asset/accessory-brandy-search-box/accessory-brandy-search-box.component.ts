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
  @Input() selectedId: any;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() AccessoryBrandOptions: any[] = [];
  AccessoryBrands: any[] = [];
  @Input() assignAssetForm: FormGroup;
  @Input() index: number;
  @Output() AccessoryBrandOptionSelected: EventEmitter<any> = new EventEmitter();
  locationId: any;
  uniqueBrandsArray: any[] = [];
  selectedOption: any;
  private closeFlagSubscription: Subscription;

  constructor(private assignDataManagementService: AssignDataManagementService,
    private formBuilder: FormBuilder,
    private closeFlagService: CloseFlagService,
    private deviceAssignService: DeviceAssignService,
    private selectedCountryService: SelectedCountryService,
    private dataService: DataService
  ) { }

  onSelectOption(option: any): void {
    //console.log(this.AccessoryBrandOptions);
    const data = { option: option, index: this.index };
    alert(option);
    this.AccessoryBrandOptionSelected.emit(data);
  }
  onClearSelection(): void {
    this.selectedOption = null;
    const accessoryIdsArray = this.assignAssetForm.get('accessoryIds') as FormArray;
    const index = accessoryIdsArray.controls.findIndex(control => control.value.index === this.index);
    if (index !== -1) {
      accessoryIdsArray.removeAt(index);
      this.selectedOption = null;
    }
    const data = { option: null, index: this.index };
    this.AccessoryBrandOptionSelected.emit(data);
  }

  ngOnInit(): void {
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.getDeviceLocation();
    });
    this.closeFlagService.setCloseFlagToFalse();
    this.selectedOption = this.assignDataManagementService.getState("accessoriesBrand", this.index);
    if (this.selectedOption)
      this.AccessoryBrandOptionSelected.emit(this.selectedOption);
  }
  ngOnDestroy(): void {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
      if (!closeFlag) {
        this.assignDataManagementService.setState("accessoriesBrand", this.selectedOption, this.index);
      }
    });
    this.closeFlagSubscription.unsubscribe();
  }

  ngOnChanges() {

    if (this.selectedId != null)
      this.getAccessoriesDetails();
  }

  getAccessoriesDetails() {

    const input = {
      categoryName: this.selectedId,
      locationId: this.locationId
    }

    this.deviceAssignService.getAccessoriesDetails(input).subscribe(
      (data: any[]) => {
        this.AccessoryBrands = data;
        const uniqueBrandsSet = new Set(this.AccessoryBrands.map(item => item.brand));
        this.uniqueBrandsArray = Array.from(uniqueBrandsSet);

        console.log(this.AccessoryBrands);
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
            this.locationId = data[i].id;
            if (this.selectedId != null)
              this.getAccessoriesDetails();
            break;
          }
        }
      },
      (error) => {
        console.log("User not found");
      });
  }



}
