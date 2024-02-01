import { ChangeDetectorRef, Component, Input, OnInit, ElementRef, AfterViewInit} from '@angular/core';
import { DashboardService } from '../shared/services/Dashboard.service';
import { FormGroup } from '@angular/forms';
import { LocationService } from '../shared/services/location.service';
import { SelectedCountryService } from '../shared/services/selected-country.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  //data: Array<Object> = [
  //  { text: "ListItem 1", value: "ListItem 1" },
  //  { text: "ListItem 2", value: "ListItem 2" },
  //  { text: "ListItem 3", value: "ListItem 3" },
  //  { text: "ListItem 4", value: "ListItem 4" },
  //  { text: "ListItem 5", value: "ListItem 5" }
  //];
  //fieldsvalues: Object = { dataSource: this.data, text: "text", value: "value" };
  selectedLocation: any = '';
  //@Input() selectedLocation: any;
  indTime: any = '';
  usaTime: any = '';

  loading: boolean = true;
  selectedAssetAge: any = '';
  accessoriesData: any[];
  softwaresData: any[];
  primaryData: any[];
  logsData: any[];
  filteredAccessories: any[]
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

  constructor(private dashboardService: DashboardService, private cdr: ChangeDetectorRef, private elementRef: ElementRef, private LocationService: LocationService, private selectedCountryService: SelectedCountryService) {
    this.filteredAccessories = this.accessoriesData;
    this.filteredSoftware = this.softwaresData;
  }

  //ngOnInit(): void {
  //  this.ngAfterViewInit(); 
  //  this.addClassBasedOnScreenSize();
  //}

  ngAfterViewInit(): void {
    //window.addEventListener('DOMContentLoaded', () => {
    //  // Call the method directly when the content is loaded
    //  this.addClassBasedOnScreenSize();
    //});
    this.addClassBasedOnScreenSize();
    window.addEventListener('resize', this.addClassBasedOnScreenSize.bind(this));
      window.addEventListener('mousemove', this.addClassBasedOnScreenSize.bind(this));
    //window.addEventListener('loadeddata', this.addClassBasedOnScreenSize.bind(this));
    //window.addEventListener('storage', (event) => {
    //  if (event.key === 'selectedCountry') {
    //    console.log('Storage event - selectedCountry changed');
    //  }
    //});
  }

  //updateUI() {
  //  this.location = localStorage.getItem('selectedCountry');
  //  //this.LocationService.selectedCountry$.subscribe((country) => {
  //  //  this.location = country;
  //  //});
  //  console.log(this.location);
  //}

 addClassBasedOnScreenSize() {
  //const containerDiv = document.getElementById('myDiv');
   // const screenWidth = window.innerWidth;
   const containerDiv = this.elementRef.nativeElement.querySelector('#set-size');
   
   
   if (containerDiv) {
     if (window.innerWidth >= 2000) {
       containerDiv.classList.add('container', 'd-flex', 'justify-content-center', 'align-items-center');
     } else {
       containerDiv.classList.remove('container', 'd-flex', 'justify-content-center', 'align-items-center');
     }
   }
}


  getAssetAgeLabel(selectedValue: any): string {
    switch (selectedValue) {
      case 1: return '0-1 years';
      case 2: return '1-2 years';
      case 3: return '2-3 years';
      case 4: return '3-4 years';
      default: return 'Asset Age';
    }
  }

  handleCheckboxChange() {
    console.log('Selected Asset Age:', this.selectedAssetAge);
  }


  ngOnInit(): void {
    this.getAccessoriesData();
    this.getSoftwaresData();
    this.getPrimaryData();
    this.getLogsData();
    
    //this.updateUI();
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.selectedLocation = selectedCountry;
      console.log(this.selectedLocation);
    });
  }



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
    this.loading = true;

    this.dashboardService.GetAccessories().subscribe(
      data => {
        //console.log(data)
        this.accessoriesData = data;
        this.loading = false;
        this.cdr.detectChanges();
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
        this.setLastUpdated();
      },
      error => {
        console.error('Error fetching accessories data', error);
      }
    );
  }

  setLastUpdated(): void {
    if (this.logsData && this.logsData.length > 0) {
      for (var i = 0; i < this.logsData.length; i++) {
        if (this.logsData[i].location == 'India') {
          this.indTime = this.logsData[i].updatedOn;
          break;
        }
      }

      for (var i = 0; i < this.logsData.length; i++) {
        if (this.logsData[i].location == 'USA') {
          this.usaTime = this.logsData[i].updatedOn;
          break;
        }
      }
    }
  }
}
