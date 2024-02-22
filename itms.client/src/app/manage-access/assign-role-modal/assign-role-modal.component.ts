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
  selectedRole: string = 'Admin';

  superAdminPermissions: { permissionName: string; permissionDescription: string; }[] = [
    {
      permissionName: 'Add Assets',
      permissionDescription: 'Has the authority to add laptops, software, and accessories in inventory.',
    },
    {
      permissionName: 'Assign Assets',
      permissionDescription: 'Has the authority to assign laptops, software, and accessories to users.',
    },
    {
      permissionName: 'Archive Assets',
      permissionDescription: 'Can have permission to archive the assets.',
    },
    {
      permissionName: 'Comments',
      permissionDescription: 'Can have permission to comment while assigning & adding assets.',
    },
    {
      permissionName: 'Exit Process',
      permissionDescription: 'Can initiate and retrieve exit process.',
    },
    {
      permissionName: 'Location Access',
      permissionDescription: 'Has the authority to add assets like laptops, software, and accessories in inventory.',
    },
  ];

  adminPermissions: { permissionName: string; permissionDescription: string; }[] = [
    {
      permissionName: 'Add Assets',
      permissionDescription: 'Has the authority to add laptops, software, and accessories in inventory.',
    },
    {
      permissionName: 'Assign Assets',
      permissionDescription: 'Has the authority to assign laptops, software, and accessories to users.',
    },
    {
      permissionName: 'Comments',
      permissionDescription: 'Can have permission to comment while assigning & adding assets.',
    },
    {
      permissionName: 'Exit Process',
      permissionDescription: 'Can initiate and retrieve exit process.',
    },
  ];

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

  roleSelector() {
    console.log(this.selectedRole);
  }


  ngOnInit(): void {
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.getUserLocation();
    });
  }
}
