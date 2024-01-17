import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../shared/services/Dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  softwaresData: any[];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getSoftwaresData();
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
