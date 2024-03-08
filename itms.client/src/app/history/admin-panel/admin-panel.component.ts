import { Component, Input } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { AdminDetailService } from '../../shared/services/admin-detail.service';
import { SelectedCountryService } from '../../shared/services/selected-country.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  @Input() adminDetail: any
  adminList: any[] = [];
  locationId: string = '';
  filterName: string = '';
  constructor(private dataService: DataService, private adminDetailService: AdminDetailService, private selectedCountryService: SelectedCountryService) { }

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
    this.dataService.getAdminList(this.locationId).subscribe(
      (data) => {
        const superAdmins = data.filter(admin => admin.role === 'Superadmin');
        const admins = data.filter(admin => admin.role === 'Admin');
        this.adminList = superAdmins.concat(admins);
        //this.adminList = data;
        this.adminDetailService.setSelectedAdmin(this.adminList[0]);
        this.adminDetailService.setSelectedCardIndex(0);
       // console.log(this.adminList);
      },
      (error) => {
        console.log(error);
      });
  }



}
