import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';
import { Subscription } from 'rxjs';
import { CloseFlagService } from '../../shared/services/close-flag.service';

@Component({
  selector: 'app-software-search-box',
  templateUrl: './software-search-box.component.html',
  styleUrls: ['./software-search-box.component.css']
})
export class SoftwareSearchBoxComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() SoftwareOptions: any[] = [];
  @Input() index: number;
  @Output() SoftwareOptionSelected: EventEmitter<any> = new EventEmitter();
  @Output() removeSoftware = new EventEmitter<number>();
  uniqueSoftwareNames: any[] = [];
  selectedOption: any;
  private closeFlagSubscription: Subscription;

  constructor(private assignDataManagementService: AssignDataManagementService,
    private closeFlagService: CloseFlagService
  ) { }

  onClearSelection(): void {
    this.selectedOption = null;
  }

  UniqueOptions(): void {
    const uniqueNamesSet = new Set<string>(this.SoftwareOptions.map(option => option.softwareName));
    this.uniqueSoftwareNames = Array.from(uniqueNamesSet);
  }

  onSelectOption(option: any): void {
    this.SoftwareOptionSelected.emit(option);
  }

  ngOnInit(): void {
    this.closeFlagService.setCloseFlagToFalse();
    this.selectedOption = this.assignDataManagementService.getState("softwareNames", this.index);
    this.SoftwareOptionSelected.emit(this.selectedOption);
    this.UniqueOptions();
  }

  ngOnDestroy(): void {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
      if (!closeFlag) {
        this.assignDataManagementService.setState("softwareNames", this.selectedOption, this.index);
      }
    });
    this.closeFlagSubscription.unsubscribe();
  }
  emitRemoveSoftware(): void {
    this.removeSoftware.emit(this.index);
  }
}
