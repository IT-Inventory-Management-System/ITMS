import { Component } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { AdminDetailService } from '../../shared/services/admin-detail.service';
import { SelectedCountryService } from '../../shared/services/selected-country.service';

@Component({
  selector: 'app-admin-list-panel',
  templateUrl: './admin-list-panel.component.html',
  styleUrls: ['./admin-list-panel.component.css']
}) 
export class AdminListPanelComponent {

  adminList: any[] = [];
  locationId: string = '';
  filterName: string = '';
  loading: boolean = true;


  constructor(private dataService: DataService, private adminDetailService: AdminDetailService, private selectedCountryService: SelectedCountryService) { }

  ngOnInit(): void {
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.getUserLocation();
    });
    //this.loadAdminList();
    this.adminDetailService.adminListChanged$.subscribe(() => {
      this.getUserLocation();
    });
    
  }

  getUserLocation() {
    this.dataService.getLocation().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == localStorage.getItem('selectedCountry')) {
            this.locationId = data[i].id;
            //alert(this.locationId);
            this.loadAdminList();
            break;
          }
        }
      },
      (error) => {
        console.log("User not found");
      });
  }

  loadAdminList() {
    this.loading = true;
    this.dataService.getAdminList(this.locationId).subscribe(
      (data) => {

        const superAdmins = data.filter(admin => admin.role === 'Superadmin');
        const admins = data.filter(admin => admin.role === 'Admin');
        this.adminList = superAdmins.concat(admins);

        //this.adminList = data;
        this.adminDetailService.setSelectedAdmin(this.adminList[0]);
        this.adminDetailService.setSelectedCardIndex(0);
       // console.log("ADMIN DATA : ", this.adminList);
        this.loading = false;
      },
      (error) => {
        console.log(error);
      });
  }


}
