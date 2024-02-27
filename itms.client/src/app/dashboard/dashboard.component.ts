import { ChangeDetectorRef, Component, Input, OnInit, ElementRef, AfterViewInit} from '@angular/core';
import { DashboardService } from '../shared/services/Dashboard.service';
import { FormGroup } from '@angular/forms';
import { LocationService } from '../shared/services/location.service';
import { SelectedCountryService } from '../shared/services/selected-country.service';
import { DataService } from '../shared/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  c1: any = 0;
  c2: any = 0;
  c3: any = 0;
  c4: any = 0;
  
  assetMac: any = {
    name: "Mac",
    totalIndia: 0,
    assignedIndia: 0,
    totalUSA: 0,
    assignedUSA: 0
  };

  assetWindows: any = {
    name: "Windows",
    totalIndia: 0,
    assignedIndia: 0,
    totalUSA: 0,
    assignedUSA: 0
  };

  assetMobile: any = {
    name: "Mobile",
    totalIndia: 0,
    assignedIndia: 0,
    totalUSA: 0,
    assignedUSA: 0
  };

  assetMonitor: any = {
    name: "Monitor",
    totalIndia: 0,
    assignedIndia: 0,
    totalUSA: 0,
    assignedUSA: 0
  };

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
    locationid: string | null;

  applySoftwareFilter(event: Event) {
    this.filterValues = (event.target as HTMLInputElement).value;
    this.filteredSoftware = this.softwaresData.filter((software) =>
      software.name.toLowerCase().includes(this.filterValues.toLowerCase())
    );
  }

  redirectToAccessoriesPage(): void {
    this.router.navigate(['/accessories']); // Adjust the route according to your app's routing configuration
  }
  redirectToSoftwarePage(): void {
    this.router.navigate(['/software']);
  }

  redirectToActivityLog(): void {
    this.router.navigate(['/history']);

  }
  

  applyAccessoryFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filteredAccessories = this.accessoriesData.filter((accessory) =>
      accessory.name.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  constructor(private dashboardService: DashboardService, private cdr: ChangeDetectorRef, private elementRef: ElementRef, private LocationService: LocationService, private selectedCountryService: SelectedCountryService, private dataService: DataService, private router: Router) {
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
    this.assetMac = {
      name: "Mac",
      totalIndia: 0,
      assignedIndia: 0,
      totalUSA: 0,
      assignedUSA: 0
    };

    this.assetWindows = {
      name: "Windows",
      totalIndia: 0,
      assignedIndia: 0,
      totalUSA: 0,
      assignedUSA: 0
    };

    this.assetMobile = {
      name: "Mobile",
      totalIndia: 0,
      assignedIndia: 0,
      totalUSA: 0,
      assignedUSA: 0
    };

    this.assetMonitor= {
      name: "Monitor",
      totalIndia: 0,
      assignedIndia: 0,
      totalUSA: 0,
      assignedUSA: 0
    };

    if (this.c1 == 0 && this.c2 == 0 && this.c3 == 0 && this.c4 == 0) {
      this.assetMac = {
        name: "Mac",
        totalIndia: this.primaryData[0][0].totalIndia,
        assignedIndia: this.primaryData[0][0].assignedIndia,
        totalUSA: this.primaryData[0][0].totalUSA,
        assignedUSA: this.primaryData[0][0].assignedUSA
      };

      this.assetWindows = {
        name: "Windows",
        totalIndia: this.primaryData[1][0].totalIndia,
        assignedIndia: this.primaryData[1][0].assignedIndia,
        totalUSA: this.primaryData[1][0].totalUSA,
        assignedUSA: this.primaryData[1][0].assignedUSA
      };
      this.assetMonitor = {
        name: "Monitor",
        totalIndia: this.primaryData[2][0].totalIndia,
        assignedIndia: this.primaryData[2][0].assignedIndia,
        totalUSA: this.primaryData[2][0].totalUSA,
        assignedUSA: this.primaryData[2][0].assignedUSA
      };

      this.assetMobile = {
        name: "Mobile",
        totalIndia: this.primaryData[3][0].totalIndia,
        assignedIndia: this.primaryData[3][0].assignedIndia,
        totalUSA: this.primaryData[3][0].totalUSA,
        assignedUSA: this.primaryData[3][0].assignedUSA
      };
    }

    if (this.primaryData && this.primaryData.length > 0 && this.primaryData[0].length>0) {
      if (this.c1 == 1) {
        this.assetMac = {
          name: "Mac",
          totalIndia: this.assetMac.totalIndia + this.primaryData[0][1].totalIndia,
          assignedIndia: this.assetMac.assignedIndia + this.primaryData[0][1].assignedIndia,
          totalUSA: this.assetMac.totalUSA + this.primaryData[0][1].totalUSA,
          assignedUSA: this.assetMac.assignedUSA + this.primaryData[0][1].assignedUSA
        };

        this.assetWindows = {
          name: "Windows",
          totalIndia: this.assetWindows.totalIndia + this.primaryData[1][1].totalIndia,
          assignedIndia: this.assetWindows.assignedIndia + this.primaryData[1][1].assignedIndia,
          totalUSA: this.assetWindows.totalUSA + this.primaryData[1][1].totalUSA,
          assignedUSA: this.assetWindows.assignedUSA + this.primaryData[1][1].assignedUSA
        };
        this.assetMonitor = {
          name: "Monitor",
          totalIndia: this.assetMonitor.totalIndia + this.primaryData[2][1].totalIndia,
          assignedIndia: this.assetMonitor.assignedIndia + this.primaryData[2][1].assignedIndia,
          totalUSA: this.assetMonitor.totalUSA + this.primaryData[2][1].totalUSA,
          assignedUSA: this.assetMonitor.assignedUSA + this.primaryData[2][1].assignedUSA
        };

        this.assetMobile = {
          name: "Mobile",
          totalIndia: this.assetMobile.totalIndia + this.primaryData[3][1].totalIndia,
          assignedIndia: this.assetMobile.assignedIndia + this.primaryData[3][1].assignedIndia,
          totalUSA: this.assetMobile.totalUSA + this.primaryData[3][1].totalUSA,
          assignedUSA: this.assetMobile.assignedUSA + this.primaryData[3][1].assignedUSA
        };
      }

      if (this.c2 == 1) {
        this.assetMac = {
          name: "Mac",
          totalIndia: this.assetMac.totalIndia + this.primaryData[0][2].totalIndia,
          assignedIndia: this.assetMac.assignedIndia + this.primaryData[0][2].assignedIndia,
          totalUSA: this.assetMac.totalUSA + this.primaryData[0][2].totalUSA,
          assignedUSA: this.assetMac.assignedUSA + this.primaryData[0][2].assignedUSA
        };

        this.assetWindows = {
          name: "Windows",
          totalIndia: this.assetWindows.totalIndia + this.primaryData[1][2].totalIndia,
          assignedIndia: this.assetWindows.assignedIndia + this.primaryData[1][2].assignedIndia,
          totalUSA: this.assetWindows.totalUSA + this.primaryData[1][2].totalUSA,
          assignedUSA: this.assetWindows.assignedUSA + this.primaryData[1][2].assignedUSA
        };
        this.assetMonitor = {
          name: "Monitor",
          totalIndia: this.assetMonitor.totalIndia + this.primaryData[2][2].totalIndia,
          assignedIndia: this.assetMonitor.assignedIndia + this.primaryData[2][2].assignedIndia,
          totalUSA: this.assetMonitor.totalUSA + this.primaryData[2][2].totalUSA,
          assignedUSA: this.assetMonitor.assignedUSA + this.primaryData[2][2].assignedUSA
        };

        this.assetMobile = {
          name: "Mobile",
          totalIndia: this.assetMobile.totalIndia + this.primaryData[3][2].totalIndia,
          assignedIndia: this.assetMobile.assignedIndia + this.primaryData[3][2].assignedIndia,
          totalUSA: this.assetMobile.totalUSA + this.primaryData[3][2].totalUSA,
          assignedUSA: this.assetMobile.assignedUSA + this.primaryData[3][2].assignedUSA
        };
      }

      if (this.c3 == 1) {
        this.assetMac = {
          name: "Mac",
          totalIndia: this.assetMac.totalIndia + this.primaryData[0][3].totalIndia,
          assignedIndia: this.assetMac.assignedIndia + this.primaryData[0][3].assignedIndia,
          totalUSA: this.assetMac.totalUSA + this.primaryData[0][3].totalUSA,
          assignedUSA: this.assetMac.assignedUSA + this.primaryData[0][3].assignedUSA
        };

        this.assetWindows = {
          name: "Windows",
          totalIndia: this.assetWindows.totalIndia + this.primaryData[1][3].totalIndia,
          assignedIndia: this.assetWindows.assignedIndia + this.primaryData[1][3].assignedIndia,
          totalUSA: this.assetWindows.totalUSA + this.primaryData[1][3].totalUSA,
          assignedUSA: this.assetWindows.assignedUSA + this.primaryData[1][3].assignedUSA
        };
        this.assetMonitor = {
          name: "Monitor",
          totalIndia: this.assetMonitor.totalIndia + this.primaryData[2][3].totalIndia,
          assignedIndia: this.assetMonitor.assignedIndia + this.primaryData[2][3].assignedIndia,
          totalUSA: this.assetMonitor.totalUSA + this.primaryData[2][3].totalUSA,
          assignedUSA: this.assetMonitor.assignedUSA + this.primaryData[2][3].assignedUSA
        };

        this.assetMobile = {
          name: "Mobile",
          totalIndia: this.assetMobile.totalIndia + this.primaryData[3][3].totalIndia,
          assignedIndia: this.assetMobile.assignedIndia + this.primaryData[3][3].assignedIndia,
          totalUSA: this.assetMobile.totalUSA + this.primaryData[3][3].totalUSA,
          assignedUSA: this.assetMobile.assignedUSA + this.primaryData[3][3].assignedUSA
        };
      }

      if (this.c4 == 1) {
        this.assetMac = {
          name: "Mac",
          totalIndia: this.assetMac.totalIndia + this.primaryData[0][4].totalIndia,
          assignedIndia: this.assetMac.assignedIndia + this.primaryData[0][4].assignedIndia,
          totalUSA: this.assetMac.totalUSA + this.primaryData[0][4].totalUSA,
          assignedUSA: this.assetMac.assignedUSA + this.primaryData[0][4].assignedUSA
        };

        this.assetWindows = {
          name: "Windows",
          totalIndia: this.assetWindows.totalIndia + this.primaryData[1][4].totalIndia,
          assignedIndia: this.assetWindows.assignedIndia + this.primaryData[1][4].assignedIndia,
          totalUSA: this.assetWindows.totalUSA + this.primaryData[1][4].totalUSA,
          assignedUSA: this.assetWindows.assignedUSA + this.primaryData[1][4].assignedUSA
        };
        this.assetMonitor = {
          name: "Monitor",
          totalIndia: this.assetMonitor.totalIndia + this.primaryData[2][4].totalIndia,
          assignedIndia: this.assetMonitor.assignedIndia + this.primaryData[2][4].assignedIndia,
          totalUSA: this.assetMonitor.totalUSA + this.primaryData[2][4].totalUSA,
          assignedUSA: this.assetMonitor.assignedUSA + this.primaryData[2][4].assignedUSA
        };

        this.assetMobile = {
          name: "Mobile",
          totalIndia: this.assetMobile.totalIndia + this.primaryData[3][4].totalIndia,
          assignedIndia: this.assetMobile.assignedIndia + this.primaryData[3][4].assignedIndia,
          totalUSA: this.assetMobile.totalUSA + this.primaryData[3][4].totalUSA,
          assignedUSA: this.assetMobile.assignedUSA + this.primaryData[3][4].assignedUSA
        };
      }
    }
  }


  ngOnInit(): void {
    this.getAccessoriesData();
    this.getSoftwaresData();
    this.getPrimaryData();


    //this.updateUI();





    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.selectedLocation = selectedCountry;
      console.log(this.selectedLocation);
      this.getUserLocation();

    });
  }

  getUserLocation() {
    this.dataService.getLocation().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == localStorage.getItem('selectedCountry')) {
            this.locationid = data[i].id;
            console.log(this.locationid);
            this.getLogsData(this.locationid);
            break;
          }
        }
      },
      (error) => {
        console.log("User not found");
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
        if (this.primaryData && this.primaryData.length > 0) {
          this.assetMac = {
            name: "Mac",
            totalIndia: this.primaryData[0][0].totalIndia,
            assignedIndia: this.primaryData[0][0].assignedIndia,
            totalUSA: this.primaryData[0][0].totalUSA,
            assignedUSA: this.primaryData[0][0].assignedUSA
          };

          this.assetWindows = {
            name: "Windows",
            totalIndia: this.primaryData[1][0].totalIndia,
            assignedIndia: this.primaryData[1][0].assignedIndia,
            totalUSA: this.primaryData[1][0].totalUSA,
            assignedUSA: this.primaryData[1][0].assignedUSA
          };
          this.assetMonitor = {
            name: "Monitor",
            totalIndia: this.primaryData[2][0].totalIndia,
            assignedIndia: this.primaryData[2][0].assignedIndia,
            totalUSA: this.primaryData[2][0].totalUSA,
            assignedUSA: this.primaryData[2][0].assignedUSA
          };

          this.assetMobile = {
            name: "Mobile",
            totalIndia: this.primaryData[3][0].totalIndia,
            assignedIndia: this.primaryData[3][0].assignedIndia,
            totalUSA: this.primaryData[3][0].totalUSA,
            assignedUSA: this.primaryData[3][0].assignedUSA
          };
        }
      },
      error => {
        console.error('Error fetching accessories data', error);
      }
    );
   

    
  }

  getLogsData(locationid: any): void {
    const body = { locationid: locationid };
    console.log("body",body);
    this.dashboardService.GetLogs(body).subscribe(
      data => {
        console.log(data);
        this.logsData = data;
        this.setLastUpdated();
      },
      error => {
        console.error('Error fetching logs data', error);
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
