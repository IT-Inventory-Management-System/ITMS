import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DisplayDetailsService } from '../shared/services/display-details.service';
import { DataService } from '../shared/services/data.service';
import { SelectedCountryService } from '../shared/services/selected-country.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  
  providers: [DisplayDetailsService]
})

export class UserListComponent implements OnInit {
  displayingData: any[] = [];
  filterName: string = '';
  selectedUserIndex: number = 0;
  locationId: string = '';
  loading: boolean = true;
  filteredDisplayingData: any[] = [];


  @Input() showArchiveUsers: any;


  @Output() userDetailsClicked: EventEmitter<any> = new EventEmitter<any>();

  ngOnChanges() {
    if (this.showArchiveUsers || !this.showArchiveUsers)
      this.filterAndSort();
  }

  filterAndSort() {
    if (this.showArchiveUsers) 
      this.filteredDisplayingData = this.displayingData.filter(user => user.isArchived === true && this.calculateDaysDifference(user.updatedAtUtc) > 30);
    else 
      this.filteredDisplayingData = this.displayingData.filter(user => user.isArchived === false || (user.isArchived === true &&  this.calculateDaysDifference(user.updatedAtUtc) < 30));
    this.filteredDisplayingData.sort((a, b) => a.cgiid.localeCompare(b.cgiid));
    this.loading = false;
    if (this.filteredDisplayingData.length > 0) {
      this.showUserDetails(this.filteredDisplayingData[0], 0);
    }
  }

  calculateDaysDifference(updatedAtUtc: string): number {
    const currentDate = new Date();
    const updatedAt = new Date(updatedAtUtc);
    const differenceInTime = currentDate.getTime() - updatedAt.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert milliseconds to days
    return Math.abs(Math.round(differenceInDays)); // Return absolute value of days
  }

 
  //@Output() showArchiveUsersChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  //onArchiveCheckboxChange(): void {
  //  this.showArchiveUsers = !this.showArchiveUsers;
  //  this.showArchiveUsersChanged.emit(this.showArchiveUsers);
  //  this.showUserListData();
  //}

  showUserDetails(userDetails: any, index: number) {
   
    this.filteredDisplayingData.forEach(user => {
      user.isSelected = false;
    });

  
    const originalIndex = this.filteredDisplayingData.findIndex(user => user.cgiid === userDetails.cgiid);

    if (originalIndex !== -1) {
      this.filteredDisplayingData[originalIndex].isSelected = true;
      this.userDetailsClicked.emit(this.filteredDisplayingData[originalIndex]);
    }
    
  }

  constructor(private displayingDetailsService: DisplayDetailsService, private dataService: DataService, private selectedCountryService: SelectedCountryService) {
  } 

  getUserLocation() {
    this.dataService.getLocation().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == localStorage.getItem('selectedCountry')) {
            this.locationId = data[i].id;
            //alert(this.locationId);
            this.showUserListData(); 
            break;
          }
        }
      },
      (error) => {
        console.log("User not found");
      });
  }

  ngOnInit(): void {
    //this.getUserLocation(); 
    this.loading = true;
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.getUserLocation();
    });
  }
 
  showUserListData() {
  
    console.log(this.locationId);
    this.displayingDetailsService.getshowUserListData(this.locationId).subscribe(
      (data) => {
        console.log("employee data:", data);
        this.displayingData = data;
        this.filterAndSort();       
      },
      (error) => {
        console.log('Error in API request : ', error);
      }
    );
  }

  GetUserDetails = (details: any) => {
    console.log(details.id);
    console.log("working");
  }
}
