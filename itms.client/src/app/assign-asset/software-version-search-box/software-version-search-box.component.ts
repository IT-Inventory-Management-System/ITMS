import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';
import { Subscription } from 'rxjs';
import { CloseFlagService } from '../../shared/services/close-flag.service';

@Component({
  selector: 'app-software-version-search-box',
  templateUrl: './software-version-search-box.component.html',
  styleUrls: ['./software-version-search-box.component.css']
})
export class SoftwareVersionSearchBoxComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() SoftwareVersionOptions:Set<string>;
  @Input() assignAssetForm: FormGroup;
  @Output() SoftwareVersionOptionSelected: EventEmitter<any> = new EventEmitter();

  selectedOption: any;
  private closeFlagSubscription: Subscription;

  constructor(private assignDataManagementService: AssignDataManagementService,
    private closeFlagService: CloseFlagService
) { }

  onSelectOption(option: any): void {
    this.SoftwareVersionOptionSelected.emit(option);
  }
  onClearSelection(): void {
    this.assignAssetForm.get('softwareId')?.setValue(null);
  }

  ngOnInit(): void {
    this.closeFlagService.setCloseFlagToFalse();
    this.selectedOption = this.assignDataManagementService.getState("softwareVersion");
    if (this.selectedOption)
      this.SoftwareVersionOptionSelected.emit(this.selectedOption);
  }
  ngOnDestroy(): void {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
      if (!closeFlag) {
        this.assignDataManagementService.setState("softwareVersion", this.selectedOption);
      }
    });
    this.closeFlagSubscription.unsubscribe();
  }

  setSaveStateOnDestroy(): void {
    this.selectedOption = null;
  }
  
}
