import { Component, EventEmitter, Output } from '@angular/core';
import { AdminDetailService } from '../../shared/services/admin-detail.service';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-admin-permissions-panel',
  templateUrl: './admin-permissions-panel.component.html',
  styleUrls: ['./admin-permissions-panel.component.css']
})
export class AdminPermissionsPanelComponent {
  selectedAdmin: any;
  isToggleChecked = true;
  //@Output() revokeEvent: EventEmitter<any> = new EventEmitter();

  handleModalClose() {
    this.isToggleChecked = true;
  }

  revokeRole() {
    //this.revokeEvent.emit(this.selectedAdmin);
  }

  changeRole() {

    const userData = {
      userId: this.selectedAdmin.id,
      newRole: 'User'
    };

    console.log(userData);

    this.dataService.changeUserRole(userData).subscribe(
      (response) => {
        console.log(response);
        this.adminDetailService.notifyAdminListChanged();
        this.isToggleChecked = true;
      },
      (error) => {
        console.log("User not found");
      });
  }

  constructor(private adminDetailService: AdminDetailService, private dataService: DataService) { }

  ngOnInit() {
    this.adminDetailService.selectedAdmin$.subscribe((admin) => {
      this.selectedAdmin = admin;
    });
  }


  superAdminPermissions: { permissionName: string; permissionDescription: string; }[] = [
      {
        permissionName: 'Add Assets',
        permissionDescription: 'Has the authority to add laptops, software, and accessories in inventory.',
      },
      {
        permissionName: 'Assign Assets',
        permissionDescription: 'Has the authority to assign laptops, software, and accessories to users.',
      },
      {
        permissionName: 'Archive Assets',
        permissionDescription: 'Can have permission to archive the assets.',
      },
      {
        permissionName: 'Comments',
        permissionDescription: 'Can have permission to comment while assigning & adding assets.',
      },
      {
        permissionName: 'Exit Process',
        permissionDescription: 'Can initiate and retrieve exit process.',
      },
      {
        permissionName: 'Location Access',
        permissionDescription: 'Has the authority to add assets like laptops, software, and accessories in inventory.',
      },
  ];

  adminPermissions: { permissionName: string; permissionDescription: string; }[] = [
    {
      permissionName: 'Add Assets',
      permissionDescription: 'Has the authority to add laptops, software, and accessories in inventory.',
    },
    {
      permissionName: 'Assign Assets',
      permissionDescription: 'Has the authority to assign laptops, software, and accessories to users.',
    },
    {
      permissionName: 'Comments',
      permissionDescription: 'Can have permission to comment while assigning & adding assets.',
    },
    {
      permissionName: 'Exit Process',
      permissionDescription: 'Can initiate and retrieve exit process.',
    },
  ];

}
