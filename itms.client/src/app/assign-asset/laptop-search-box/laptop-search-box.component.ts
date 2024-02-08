import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  @Output() LaptopOptionSelected: EventEmitter<any> = new EventEmitter();

  private closeFlagSubscription: Subscription;
  selectedOption: any;
  constructor(private assignDataManagementService: AssignDataManagementService,
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
    this.selectedOption = this.assignDataManagementService.getState("cygid");
    this.LaptopOptionSelected.emit(this.selectedOption);
  }

  ngOnDestroy(): void {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
      if (!closeFlag) {
        this.assignDataManagementService.setState("cygid", this.selectedOption);
      }
    });
    this.closeFlagSubscription.unsubscribe();
  }

  setSaveStateOnDestroy(): void {
    this.selectedOption = null;
    this.assignDataManagementService.setState("cygid", null);
  }

  onClearSelection(): void {
    this.selectedOption = null;
    this.assignAssetForm.get('cygid')?.setValue(null);
  }

  onSelectOption(option: any): void {
    this.LaptopOptionSelected.emit(option);
    if (option.assignedTo && 'assignedTo' in option && option.assignedTo) {
      this.selectedOption = null;
      this.assignAssetForm.get('cygid')?.setValue(null);
      console.log(this.selectedOption);
    }
    else {
      this.selectedOption = option;
      this.assignAssetForm.get('cygid')?.setValue(option.cygid);
    }
  }
}
