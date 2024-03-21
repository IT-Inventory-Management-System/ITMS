import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() options: any[] = [];
  @Input() assignAssetForm: FormGroup;

  @Output() userSelected: EventEmitter<any> = new EventEmitter();


  selectedOption: any;
  constructor(private assignDataManagementService: AssignDataManagementService) { }

  ngOnInit(): void {
    this.selectedOption = this.assignDataManagementService.getState("assignedTo");
  }

  ngOnDestroy(): void {
    this.assignDataManagementService.setState("assignedTo", this.selectedOption);
  }
  onSelectOption(option: any): void {
    this.assignAssetForm.get('assignedTo')?.setValue(option.id);
    this.userSelected.emit({isUserSelected: true});
  }
  setSaveStateOnDestroy(): void {
    this.selectedOption = null;
  }

  onClearSelection(): void {
    this.assignAssetForm.get('assignedTo')?.setValue(null);
    this.userSelected.emit({ isUserSelected: false });
  }
}
