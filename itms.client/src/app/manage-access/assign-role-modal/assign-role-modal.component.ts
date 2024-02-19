import { Component } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { SelectedCountryService } from '../../shared/services/selected-country.service';
import { DisplayDetailsService } from '../../shared/services/display-details.service';

@Component({
  selector: 'app-assign-role-modal',
  templateUrl: './assign-role-modal.component.html',
  styleUrls: ['./assign-role-modal.component.css']
})
export class AssignRoleModalComponent {
  constructor(private dataService: DataService, private selectedCountryService: SelectedCountryService, private displayingDetailsService: DisplayDetailsService) { }

  userDataList: any[] = [];
  locationId: string = '';

  getUserLocation() {
    this.dataService.getLocation().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == localStorage.getItem('selectedCountry')) {
            this.locationId = data[i].id;
            //alert(this.locationId);
            this.loadUserData();
            break;
          }
        }
      },
      (error) => {
        console.log("User not found");
      });
  }

  loadUserData() {

    this.displayingDetailsService.getshowUserListData(this.locationId).subscribe(
      (data) => {
        this.userDataList = data;
        this.userDataList = data.sort((a, b) => a.cgiid.localeCompare(b.cgiid));
        console.log(this.userDataList);
 
      },
      (error) => {
        console.log('Error in API request : ', error);
      }
    );
  }


  ngOnInit(): void {
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.getUserLocation();
    });
  }
}
