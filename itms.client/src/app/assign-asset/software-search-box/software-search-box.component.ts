import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';


@Component({
  selector: 'app-software-search-box',
  templateUrl: './software-search-box.component.html',
  styleUrls: ['./software-search-box.component.css']
})
export class SoftwareSearchBoxComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() SoftwareOptions: any[] = [];
  @Output() SoftwareOptionSelected: EventEmitter<any> = new EventEmitter();
  uniqueSoftwareNames: any[] = [];
  selectedOption: any;
  constructor(private assignDataManagementService: AssignDataManagementService) { }

  UniqueOptions(): void {
    const uniqueNamesSet = new Set<string>(this.SoftwareOptions.map(option => option.softwareName));
    this.uniqueSoftwareNames = Array.from(uniqueNamesSet);
  }

  onSelectOption(option: any): void {
    this.SoftwareOptionSelected.emit(option);
  }

  ngOnInit(): void {
    this.selectedOption = this.assignDataManagementService.getState("softwareName");
    this.SoftwareOptionSelected.emit(this.selectedOption);
    this.UniqueOptions();
  }

  ngOnDestroy(): void {
    this.assignDataManagementService.setState("softwareName", this.selectedOption);
  }

  setSaveStateOnDestroy(): void {
    this.selectedOption = null;
  }
}
