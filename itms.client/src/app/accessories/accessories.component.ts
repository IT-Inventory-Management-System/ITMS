import { Component, SimpleChanges } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { SelectedCountryService } from '../shared/services/selected-country.service';
import { ColDef } from 'ag-grid-community';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent {
  selectedAccessoryIndex: number = 0;

  locationId: string = '';
  rowData: any[] = [];
  searchValue: string = '';

    selectedOption: string;

  selectedView: string = 'card';
  accessories: any[];
  filteredAccessories: any[]
  filterValue: string = '';
  singleSelected: any[];
  isArchived: boolean = false;
  accessoryId : any;
  archivedAttributes: any = {
    location: '',
    IsWired: '',
    selectedStock: [],
    Availability: '',
    Category: ''
  }
    historydata: any;
    cygid: any;

  applyAccessoryFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filteredAccessories = this.accessories.filter((accessory) =>
      accessory.brand.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  constructor(private dataService: DataService, private selectedCountryService: SelectedCountryService) {
    this.filteredAccessories = this.accessories;
  

  }

  onCardClicked(eventData: any, index: number): void {
    if (this.selectedAccessoryIndex === index) {
      this.selectedAccessoryIndex = -1; // Deselect the card if it's already selected
    } else {
      this.selectedAccessoryIndex = index; // Select the clicked card
    }
   
    this.cygid = eventData.CYGID;

    // console.log("cyg", this.cygid);
    // console.log(eventData);
    this.singleSelected = this.accessories.filter(a => a.cygid === eventData.CYGID);
    console.log(this.singleSelected);
    this.singleHistoryAccessory(this.locationId, this.cygid);
    this.accessoryId = eventData.accessoryId;
    console.log(this.accessoryId)
    if (this.singleSelected[0]?.isArchived) {
      this.selectedOption = 'Archived';
    } else {
      this.selectedOption = 'Active';
    }
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
    if (this.archivedAttributes.IsWired === '' && this.archivedAttributes.selectedStock.length === 0 && this.archivedAttributes.Availability === '' && this.archivedAttributes.Category === '') {
      this.getAllAccessories(this.isArchived);
    } else {
      this.onApplyClicked(this.archivedAttributes);
    }
    this.selectedAccessoryIndex = 0;
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
        this.singleSelected = [this.accessories[0]];
        this.setRowData();
        console.log('Accessories', [this.accessories[0]]);
        this.singleHistoryAccessory(this.locationId, this.accessories[0].cygid);
        this.selectedOption = this.accessories[0].isArchived ? 'Archived' : 'Active';
        this.cygid = this.accessories[0].cygid
      });
  }

  singleHistoryAccessory(locationId: any, cygid: any): void {
    const dto = {
      locationId: locationId,
      cygid: cygid
    };

    this.dataService.singleHistoryAccessory(dto)
      .subscribe(
        (history) => {
          this.historydata = history;
  console.log('History Data', history); 
        },
        (error) => {
          console.error('Error fetching history data:', error);
        }
      );
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


  onApplyClicked(eventData: any): void {
    const body: any = {
      location: this.locationId,
      IsArchived: this.isArchived,
      IsWired: eventData.IsWired,
      selectedStock: eventData.selectedStock,
      Availability: eventData.Availability,
      Category: eventData.Category,
    }
    
   // console.log("eventData", eventData);
    if (eventData.IsWired !== undefined) { 
      this.archivedAttributes.IsWired = eventData.IsWired;
    }
    if (eventData.selectedStock.length !== 0) {
      this.archivedAttributes.selectedStock = eventData.selectedStock;
    }
    if (eventData.Availability !== undefined) {
      this.archivedAttributes.Availability = eventData.Availability;
    }
    if (eventData.Category !== undefined) {
      this.archivedAttributes.Category = eventData.Category;
    }
    
    if (this.locationId !== '') {
      this.dataService.FilterAccessories(body).subscribe(
        (result: any | null) => {
          if (result) {
            this.accessories = result;
            this.setRowData();
          //  console.log('Accessories', this.accessories);
          } else {
            console.log('No software found for parameters:', body);
          }
        },
        error => {
          console.error('Error updating software archive status:', error);
        }
      );
    }
    this.selectedAccessoryIndex = 0;
  }





  setRowData() {
    this.rowData = [];
    for (var i = 0; i < this.accessories.length; i++) {

      let statusHTML = '';
      if (this.accessories[i].status === 'Assigned') {
        statusHTML = '<div class="assigned-status">Assigned</div>';
      } else if (this.accessories[i].status === 'Not Assigned') {
        statusHTML = '<div class="not-assigned-status">Not Assigned</div>';
      }

      this.rowData[i] = {
        "SNo": i + 1,
        "Device": this.accessories[i].category,
        "Device ID": this.accessories[i].cygid,
        "Type": this.accessories[i].isWired ? "Wireless" : "Wired",
        "Brand": this.accessories[i].brand,
        "Accessories Status": this.accessories[i].isArchived?"Archived":"Active",
       

      }

    }
  }


  colDefs: ColDef[] = [
    {
      field: "SNo",
      resizable: false,
      suppressMovable: true,
      width: 65
    },
    { field: "Device", resizable: false, width: 220, suppressMovable: true },
    { field: "Device ID", width: 220, resizable: false, suppressMovable: true },
    { field: "Type", width: 220, resizable: false, suppressMovable: true, },
    { field: "Brand", width: 220, resizable: false, suppressMovable: true, },
   { field: "Accessories Status", width: 222, resizable: false, suppressMovable: true, },
 ];
  filename = 'ExcelSheet.xlsx';
  exporttoexcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowData);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.filename);
  }

  handleModalClosed() {
    
  }

}
