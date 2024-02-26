import { Component } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { SelectedCountryService } from '../shared/services/selected-country.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent {
  locationId: string = '';

    selectedOption: string = 'Active'; // Initially selected option

  selectedView: string = 'card';
  accessories: any[];
  filteredAccessories: any[]
  filterValue: string = '';
  singleSelected: any[];
  isArchived: boolean = false;

  applyAccessoryFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filteredAccessories = this.accessories.filter((accessory) =>
      accessory.brand.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  constructor(private dataService: DataService, private selectedCountryService: SelectedCountryService) {
    this.filteredAccessories = this.accessories;

  }

  onCardClicked(eventData: any): void {
    console.log(eventData);
    this.singleSelected = this.accessories.filter(a => a.cygid === eventData.CYGID);
    console.log(this.singleSelected);
  }

  calculateYearDifference(startDate: string | null, endDate: string | null): number {
    if (!startDate || !endDate) {
      return 0;
    }

    const startYear = parseInt(startDate);
    const endYear = parseInt(endDate);
    return endYear - startYear;
  }

  calculateYear(startDate: string | null): number {
    if (!startDate) {
      return 0;
    }

    const startYear = parseInt(startDate);
    const presentYear = new Date().getFullYear();
    return presentYear - startYear;
  }

  calculateMonth(startDate: string | null): number {
    if (!startDate) {
      return 0;
    }

    const startMonth = parseInt(startDate, 10); 
    const presentMonth = new Date().getMonth() + 1;
    return presentMonth - startMonth;
  }

  calculateMonthDifference(startDate: string | null, endDate: string | null): number {
    if (!startDate || !endDate) {
      return 0;
    }

    const startMnth = parseInt(startDate);
    const endMnth = parseInt(endDate);
    return endMnth - startMnth;
  }

  Archived() {
    if (this.isArchived == true) {
      this.isArchived = false;
    } else {
      this.isArchived = true;
    }
    this.getAllAccessories(this.isArchived);
  }

  ngOnInit(): void {
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.getUserLocation();
    });
    //this.loadAdminList(); 

  }

  getUserLocation() {
    this.dataService.getLocation().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == localStorage.getItem('selectedCountry')) {
            this.locationId = data[i].id;
            //alert(this.locationId);
            this.getAllAccessories(this.isArchived);
            break;
          }
        }
      },
      (error) => {
        console.log("User not found");
      });
  }


  getAllAccessories(arh: boolean): void {
    const dto = {
      locationId: this.locationId,
      isArchived: arh, 
    };

    this.dataService.getAllAccessories(dto)
      .subscribe(accessories => {
        this.accessories = accessories;
        console.log('Accessories', this.accessories); // Do something with the data
      });
  }



  handleSelectionChange(selectedOption: string) {
    const archiveModal = document.getElementById('exampleModa');
    const unarchiveModal = document.getElementById('unarchive');

    if (selectedOption === 'Archive' && archiveModal) {
      archiveModal.classList.add('show');
      archiveModal.style.display = 'block';
    } else if (selectedOption === 'Unarchive' && unarchiveModal) {
      unarchiveModal.classList.add('show');
      unarchiveModal.style.display = 'block';
    }
  }


}
