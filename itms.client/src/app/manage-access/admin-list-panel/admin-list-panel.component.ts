import { Component } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { AdminDetailService } from '../../shared/services/admin-detail.service';

@Component({
  selector: 'app-admin-list-panel',
  templateUrl: './admin-list-panel.component.html',
  styleUrls: ['./admin-list-panel.component.css']
})
export class AdminListPanelComponent {

  adminList: any[] = [];

  constructor(private dataService: DataService, private adminDetailService: AdminDetailService) { }

  ngOnInit(): void {
    this.loadAdminList();

  }

  loadAdminList() {
    this.dataService.getAdminList().subscribe(
      (data) => {
        this.adminList = data;
        this.adminDetailService.setSelectedAdmin(this.adminList[0]);
        this.adminDetailService.setSelectedCardIndex(0);
        console.log(this.adminList);
      },
      (error) => {
        console.log(error);
      });
  }


}
