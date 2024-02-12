import { Component, OnInit } from '@angular/core';
import { SoftwareService } from '../shared/services/Software.service';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit {
  selectedView: string = 'card';
  softwaresData: any[];
  version: string[];

  filteredSoftware: any[]
  filterValues: string = '';

  applySoftwareFilter(event: Event) {
    this.filterValues = (event.target as HTMLInputElement).value;
    this.filteredSoftware = this.softwaresData.filter((software) =>
      software.name.toLowerCase().includes(this.filterValues.toLowerCase())
    );
  }


  constructor(private softwareService: SoftwareService) { } // Injecting SoftwareService

  ngOnInit(): void {
    this.getSoftwaresData();
    this.filteredSoftware = this.softwaresData;

  }

  getSoftwaresData(): void {
    this.softwareService.GetSoftware().subscribe(
      data => {
        console.log(data)
        this.softwaresData = data;
      },
      error => {
        console.error('Error fetching software data', error);
      }
    );
  }
}
