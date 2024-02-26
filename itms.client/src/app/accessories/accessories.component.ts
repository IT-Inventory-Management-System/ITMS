import { Component } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { SelectedCountryService } from '../shared/services/selected-country.service';


@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent {
  locationId: string = '';


  selectedView: string = 'card';
    accessories: any;

  constructor(private dataService: DataService, private selectedCountryService: SelectedCountryService) { }


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
            this.getAllAccessories();
            break;
          }
        }
      },
      (error) => {
        console.log("User not found");
      });
  }


  getAllAccessories(): void {
    const locationId = this.locationId; // Provide the locationId
    this.dataService.getAllAccessories(locationId)
      .subscribe(accessories => {
        this.accessories = accessories;
        console.log('Accesories',this.accessories); // Do something with the data
      });
  }


}
