import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../shared/services/Dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  accessoriesData: any[];
  softwaresData: any[];
  primaryData: any[];
  logsData: any[];

  constructor(private dashboardService: DashboardService) { }

 



  ngOnInit(): void {
    this.getAccessoriesData();
    this.getSoftwaresData();
    this.getPrimaryData();
    this.getLogsData();
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
        console.log(data)
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
        console.log(data)
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
      },
      error => {
        console.error('Error fetching accessories data', error);
      }
    );
  }
}
