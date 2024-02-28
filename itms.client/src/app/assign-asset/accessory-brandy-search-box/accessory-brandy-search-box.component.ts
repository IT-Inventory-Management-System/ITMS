import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';
import { Subscription } from 'rxjs';
import { CloseFlagService } from '../../shared/services/close-flag.service';

@Component({
  selector: 'app-accessory-brandy-search-box',
  templateUrl: './accessory-brandy-search-box.component.html',
  styleUrls: ['./accessory-brandy-search-box.component.css']
})
export class AccessoryBrandySearchBoxComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() AccessoryBrandOptions: any[] = [];
  @Input() assignAssetForm: FormGroup;
  @Input() index: number;
  @Output() AccessoryBrandOptionSelected: EventEmitter<any> = new EventEmitter();

  selectedOption: any;
  private closeFlagSubscription: Subscription;

  constructor(private assignDataManagementService: AssignDataManagementService,
    private formBuilder: FormBuilder,
    private closeFlagService: CloseFlagService
  ) { }

  onSelectOption(option: any): void {
    //console.log(this.AccessoryBrandOptions);
    const data = { option: option, index: this.index };
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
}
