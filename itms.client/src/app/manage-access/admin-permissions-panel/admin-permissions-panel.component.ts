import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-permissions-panel',
  templateUrl: './admin-permissions-panel.component.html',
  styleUrls: ['./admin-permissions-panel.component.css']
})
export class AdminPermissionsPanelComponent {


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
