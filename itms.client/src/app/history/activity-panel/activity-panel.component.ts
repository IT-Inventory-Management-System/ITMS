import { Component } from '@angular/core';
import { AdminDetailService } from '../../shared/services/admin-detail.service';

@Component({
  selector: 'app-activity-panel',
  templateUrl: './activity-panel.component.html',
  styleUrls: ['./activity-panel.component.css']
})
export class ActivityPanelComponent {
  selectedAdmin: any;

  constructor(private adminDetailService: AdminDetailService) { }

  ngOnInit() {
    this.adminDetailService.selectedAdmin$.subscribe((admin) => {
      this.selectedAdmin = admin;
      console.log("selectedadmin", this.selectedAdmin);
    });
  }
}
