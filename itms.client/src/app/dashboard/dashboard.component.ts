import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../shared/services/Dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  accessoriesData: any[];
  softwaresData: any[];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getAccessoriesData();
    this.getSoftwaresData();
  }

  getAccessoriesData(): void {
    this.dashboardService.GetAccessories().subscribe(
      data => {
        console.log(data)
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
        this.softwaresData = data;
      },
      error => {
        console.error('Error fetching software data', error);
      }
    );
  }
}
