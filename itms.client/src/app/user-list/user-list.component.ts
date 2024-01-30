import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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


  @Output() userDetailsClicked: EventEmitter<any> = new EventEmitter<any>();
  //@Output() loadingStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  showUserDetails(userDetails: any, index: number) {
   
    this.displayingData.forEach(user => {
      user.isSelected = false;
    });

  
    this.displayingData[index].isSelected = true;

    this.userDetailsClicked.emit(userDetails);
    
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
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.getUserLocation();
    });
  }
 
  showUserListData() {
   // this.loadingStateChanged.emit(true); 

    this.displayingDetailsService.getshowUserListData(this.locationId).subscribe(
      (data) => {
        this.displayingData = data;
        this.displayingData = data.sort((a, b) => a.cgiid.localeCompare(b.cgiid));
        console.log(this.displayingData);

        if (this.displayingData.length > 0) {
          this.showUserDetails(this.displayingData[0], 0);
        }
        //this.loadingStateChanged.emit(false); 
      },
      (error) => {
        console.log('Error in API request : ', error);
        //this.loadingStateChanged.emit(false); 
      }
    );
  }

  GetUserDetails = (details: any) => {
    console.log(details.id);
    console.log("working");
  }
}
