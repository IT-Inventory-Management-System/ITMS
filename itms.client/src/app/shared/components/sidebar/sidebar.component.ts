import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isSidebarCollapsed = false;
 
list=[
  {
    number:'1',
    name:'Dashboard',
    icon:'../../../../assets/icons/Dashbord.svg',
  },
  {
    number:'2',
    name:'Assets',
    icon:'../../../../assets/icons/Assets.svg',
  },
  {
    number:'3',
    name:'Software',
    icon:'../../../../assets/icons/Software.svg',
  },
  {
    number:'4',
    name:'User',
    icon:'../../../../assets/icons/Users.svg',
  },
  {
    number:'5',
    name:'Activity Logs',
    icon:'../../../../assets/icons/Logs.svg',
  },
  //{
  //  number:'6',
  //  name:'Collapse',
  //  icon:'../../../../assets/icons/Group.svg',
  //}
  ]
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
