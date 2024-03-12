import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CloseFlagService } from '../../shared/services/close-flag.service';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';

@Component({
  selector: 'app-accessories-search-box',
  templateUrl: './accessories-search-box.component.html',
  styleUrls: ['./accessories-search-box.component.css']
})
export class AccessoriesSearchBoxComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() AccessoryOptions: any[] = [];
  @Input() assignAssetForm: FormGroup;
  @Input() index: number;
  @Output() AccessoryOptionSelected: EventEmitter<any> = new EventEmitter();
  @Output() removeAccessory = new EventEmitter<number>();

  uniqueAccessoryNames: any[] = [];
  selectedOption: any;
  private closeFlagSubscription: Subscription;

  constructor(private assignDataManagementService: AssignDataManagementService,
    private closeFlagService: CloseFlagService
  ) { }

  ngOnInit(): void {
    this.closeFlagService.setCloseFlagToFalse();
    this.selectedOption = this.assignDataManagementService.getState("accessoriesName", this.index);
    this.AccessoryOptionSelected.emit(this.selectedOption);
    this.UniqueOptions();
    console.log(this.assignAssetForm.value);
  }

  ngOnDestroy(): void {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
      if (!closeFlag) {
        this.assignDataManagementService.setState("accessoriesName", this.selectedOption, this.index);
      }
    });
    this.closeFlagSubscription.unsubscribe();
  }

  onClearSelection(): void {
    this.selectedOption = null;
  }
  UniqueOptions(): void {
    const uniqueNamesSet = new Set<string>(this.AccessoryOptions.map(option => option.name));
    this.uniqueAccessoryNames = Array.from(uniqueNamesSet);
  }

  onSelectOption(option: any): void {
    this.AccessoryOptionSelected.emit(option);
  }

  emitRemoveSoftware(): void {
    const accessoryCommentsArray = this.assignAssetForm.get('accessoryComments') as FormArray;
    const i = accessoryCommentsArray.controls.findIndex(control => control.value.index === this.index);
    if (i !== -1) {
      accessoryCommentsArray.removeAt(i);
      for (let j = this.index; j < accessoryCommentsArray.length; j++) {
        const accessoryCommentsControl = accessoryCommentsArray.controls[j] as FormGroup;
        accessoryCommentsControl.patchValue({ index: j }); // Update the index in the form array control
      }
    }
    this.removeAccessory.emit(this.index);
  }
}
