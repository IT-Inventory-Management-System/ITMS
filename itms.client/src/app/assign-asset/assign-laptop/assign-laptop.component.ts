import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';
import { Subscription } from 'rxjs';
import { CloseFlagService } from '../../shared/services/close-flag.service';

@Component({
  selector: 'app-assign-laptop',
  templateUrl: './assign-laptop.component.html',
  styleUrls: ['./assign-laptop.component.css']
})
export class AssignLaptopComponent {
  @Input() LaptopOptions: any[] = [];
  @Input() assignAssetForm: FormGroup;
  @Output() cygidInputChange = new EventEmitter<boolean>();

  SelectedLaptop: any;
  formattedAge: string = '';
  selectedOption: any;
  private closeFlagSubscription: Subscription;

  constructor(private assignDataManagementService: AssignDataManagementService,
    private closeFlagService: CloseFlagService
  ) {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
      if (closeFlag) {
        this.selectedOption = null;
        this.cygidInputChange.emit(this.selectedOption);
      }
    });
  }

  cygidInputChangeFlag(event: any): void {
    console.log(event);
    this.cygidInputChange.emit(event);
  }

  LaptopSearchBoxOptionSelected(event: any): void {
    this.SelectedLaptop = event;
    this.calculateFormattedAge();
    const isAssigned = this.SelectedLaptop && this.SelectedLaptop.assignedTo;
    const cygidValue = isAssigned ? null : (this.SelectedLaptop && this.SelectedLaptop.cygid) || '';
    this.cygidInputChangeFlag(!cygidValue || cygidValue.trim() === '');
  }
  onInputChangeCommentBox(event: any): void {
    this.selectedOption = event.target.value;
    this.assignAssetForm.get('deviceComment')?.setValue(event.target.value);
  }
  calculateFormattedAge(): void {
    if (this.SelectedLaptop?.age !== undefined) {
      this.formattedAge = this.SelectedLaptop.age.toFixed(1);
    }
  }
  ngOnInit(): void {
    this.selectedOption = this.assignDataManagementService.getState("laptopComment");
  }

  ngOnDestroy(): void {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
      if (!closeFlag) {
        this.assignDataManagementService.setState("laptopComment", this.selectedOption);
      }
    });
    this.closeFlagSubscription.unsubscribe();
  }

  setSaveStateOnDestroy(): void {
    this.selectedOption = null;
    this.assignDataManagementService.setState("laptopComment", null);
  }
}
