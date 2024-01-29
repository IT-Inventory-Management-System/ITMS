import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';
import { AccessoriesSearchBoxComponent } from '../accessories-search-box/accessories-search-box.component';
import { Subscription } from 'rxjs';
import { CloseFlagService } from '../../shared/services/close-flag.service';

@Component({
  selector: 'app-assign-accessories',
  templateUrl: './assign-accessories.component.html',
  styleUrls: ['./assign-accessories.component.css']
})
export class AssignAccessoriesComponent {
  @Input() AccessoryOptions: any[] = [];
  @Input() assignAssetForm: FormGroup;
  @ViewChild(AccessoriesSearchBoxComponent) accessoriesSearchBoxComponent: AccessoriesSearchBoxComponent;
  SelectedAccessories: any;
  selectedOption: any;
  private closeFlagSubscription: Subscription;
  constructor(private assignDataManagementService: AssignDataManagementService,
    private closeFlagService: CloseFlagService
) { }


  AccessorySearchBoxOptionSelected(event: any): void {
    this.SelectedAccessories = event;
  }
  onInputChangeCommentBox(event: any): void {
    this.selectedOption = event.target.value;
    this.assignAssetForm.get('accessoryComment')?.setValue(event.target.value);
  }
  ngOnInit(): void {
    this.closeFlagService.setCloseFlagToFalse();
    this.selectedOption = this.assignDataManagementService.getState("accessoryComment");
  }

  ngOnDestroy(): void {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
      console.log(closeFlag);

      if (!closeFlag) {
        this.assignDataManagementService.setState("accessoryComment", this.selectedOption);
      }
    });
    this.closeFlagSubscription.unsubscribe();
  }

  setSaveStateOnDestroy(): void {
    this.assignDataManagementService.setState("accessoryComment", null);
  }
}
