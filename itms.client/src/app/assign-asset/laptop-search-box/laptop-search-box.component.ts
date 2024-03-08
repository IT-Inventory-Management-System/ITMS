import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';
import { Subscription } from 'rxjs';
import { CloseFlagService } from '../../shared/services/close-flag.service';

@Component({
  selector: 'app-laptop-search-box',
  templateUrl: './laptop-search-box.component.html',
  styleUrls: ['./laptop-search-box.component.css']
})
export class LaptopSearchBoxComponent implements OnInit, OnDestroy {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() LaptopOptions: any[] = [];
  @Input() assignAssetForm: FormGroup;
  @Input() index: number;
  @Output() LaptopOptionSelected: EventEmitter<any> = new EventEmitter();
  @Output() removeDevice = new EventEmitter<number>();

  private closeFlagSubscription: Subscription;
  selectedOption: any;
  constructor(private assignDataManagementService: AssignDataManagementService,
    private formBuilder: FormBuilder,
    private closeFlagService: CloseFlagService
) {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
      if (closeFlag) {
        this.selectedOption = null;
        this.LaptopOptionSelected.emit(this.selectedOption);
      }
    });
}

  ngOnInit(): void {
    this.selectedOption = this.assignDataManagementService.getState("cygids",this.index);
    this.LaptopOptionSelected.emit(this.selectedOption);
  }

  ngOnDestroy(): void {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
      if (!closeFlag) {
        this.assignDataManagementService.setState("cygids", this.selectedOption, this.index);
      }
    });
    this.closeFlagSubscription.unsubscribe();
  }

  onClearSelection(): void {
    this.selectedOption = null;
    const cygidsArray = this.assignAssetForm.get('cygids') as FormArray;
    const index = cygidsArray.controls.findIndex(control => control.value.index === this.index);
    if (index !== -1) {
      cygidsArray.removeAt(index);
      this.selectedOption = null;
    }
    //console.log(this.assignAssetForm.get('cygids'));
  }

  onSelectOption(option: any): void {
    //console.log(option);
    this.LaptopOptionSelected.emit(option);
    if (option && option.assignedTo && 'assignedTo' in option && option.assignedTo) {
      const cygidsArray = this.assignAssetForm.get('cygids') as FormArray;
      const index = cygidsArray.controls.findIndex(control => control.value.index === this.index);
      if (index !== -1) {
        cygidsArray.removeAt(index);
        this.selectedOption = null;
      }
    //  console.log(this.assignAssetForm.get('cygids'));
    }
    else {
      //console.log(option);
      this.selectedOption = option;
      const cygidsArray = this.assignAssetForm.get('cygids') as FormArray;
      cygidsArray.push(this.formBuilder.group({
        index: this.index,
        cygid: option.cygid
      }));
      //console.log(this.assignAssetForm.get('cygids'));
    }
  }
  emitRemoveDevice(): void {
    this.removeDevice.emit(this.index);
  }
}
