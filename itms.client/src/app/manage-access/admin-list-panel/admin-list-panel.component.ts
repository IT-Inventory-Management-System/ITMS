import { Component } from '@angular/core';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-admin-list-panel',
  templateUrl: './admin-list-panel.component.html',
  styleUrls: ['./admin-list-panel.component.css']
})
export class AdminListPanelComponent {

  adminList: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadAdminList();

  }

  loadAdminList() {
    this.dataService.getAdminList().subscribe(
      (data) => {
        this.adminList = data;
        console.log(this.adminList);
      },
      (error) => {
        console.log(error);
      });
  }


}
