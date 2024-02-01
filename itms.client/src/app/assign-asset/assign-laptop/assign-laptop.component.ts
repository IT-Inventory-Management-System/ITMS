import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';

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

  constructor(private assignDataManagementService: AssignDataManagementService) { }

  cygidInputChangeFlag(event: any): void {
    this.cygidInputChange.emit(event);
  }

  LaptopSearchBoxOptionSelected(event: any): void {
    this.SelectedLaptop = event;
    this.calculateFormattedAge();
    const isCygidEmpty = !this.SelectedLaptop || !this.SelectedLaptop.cygid || this.SelectedLaptop.cygid.trim() === '';
    this.cygidInputChangeFlag(isCygidEmpty);
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
    this.assignDataManagementService.setState("laptopComment", this.selectedOption);
  }

  setSaveStateOnDestroy(): void {
    this.selectedOption = null;
    this.assignDataManagementService.setState("laptopComment", null);
  }
}
