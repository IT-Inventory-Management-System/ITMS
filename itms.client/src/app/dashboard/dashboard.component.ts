import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../shared/services/Dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  //data: Array<Object> = [
  //  { text: "ListItem 1", value: "ListItem 1" },
  //  { text: "ListItem 2", value: "ListItem 2" },
  //  { text: "ListItem 3", value: "ListItem 3" },
  //  { text: "ListItem 4", value: "ListItem 4" },
  //  { text: "ListItem 5", value: "ListItem 5" }
  //];
  //fieldsvalues: Object = { dataSource: this.data, text: "text", value: "value" };


  
  selectedAssetAge: any = '';
  accessoriesData: any[];
  softwaresData: any[];
  primaryData: any[];
  logsData: any[];
  filteredAccessories: any[]  // Remove the duplicated declaration
  filterValue: string = '';

  filteredSoftware: any[]
  filterValues: string = '';

  applySoftwareFilter(event: Event) {
    this.filterValues = (event.target as HTMLInputElement).value;
    this.filteredSoftware = this.softwaresData.filter((software) =>
      software.name.toLowerCase().includes(this.filterValues.toLowerCase())
    );
  }

  applyAccessoryFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filteredAccessories = this.accessoriesData.filter((accessory) =>
      accessory.name.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  constructor(private dashboardService: DashboardService) {


    this.filteredAccessories = this.accessoriesData;
    this.filteredSoftware = this.softwaresData;

    
   

  }


  handleCheckboxChange() {
    console.log('Selected Asset Age:', this.selectedAssetAge);
  }


  ngOnInit(): void {
    this.getAccessoriesData();
    this.getSoftwaresData();
    this.getPrimaryData();
    this.getLogsData();
  }


  // utils.ts

  extractDate(dateTime: string): string {
    const dateObj = new Date(dateTime);
    const year = dateObj.getFullYear();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObj.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }


  isDateDifferent(currentIndex: number): boolean {
    if (currentIndex === 0) {
      return true;
    }
    const currentDate = this.extractDate(this.logsData[currentIndex].updatedOn);
    const previousDate = this.extractDate(this.logsData[currentIndex - 1].updatedOn);

    return currentDate !== previousDate;
  }

  getAccessoriesData(): void {
    this.dashboardService.GetAccessories().subscribe(
      data => {
        //console.log(data)
        this.accessoriesData = data;
      },
      error => {
        console.error('Error fetching accessories data', error);
      }
    );
  }

  getSoftwaresData(): void {
    this.dashboardService.GetSoftwares().subscribe(
      data => {
        //console.log(data)
        this.softwaresData = data;
      },
      error => {
        console.error('Error fetching software data', error);
      }
    );
  }

  getPrimaryData(): void {
    this.dashboardService.GetPrimary().subscribe(
      data => {
        //console.log(data)
        this.primaryData = data;
      },
      error => {
        console.error('Error fetching accessories data', error);
      }
    );
  }

  getLogsData(): void {
    this.dashboardService.GetLogs().subscribe(
      data => {
        console.log(data)
        this.logsData = data;
      },
      error => {
        console.error('Error fetching accessories data', error);
      }
    );
  }
}
