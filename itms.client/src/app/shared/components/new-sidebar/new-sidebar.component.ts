import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-new-sidebar',
  templateUrl: './new-sidebar.component.html',
  styleUrls: ['./new-sidebar.component.css']
})

export class NewSidebarComponent {

  //  isSidebarCollapsed = true;

  //  list = [
  //    {
  //      number: '1',
  //      name: 'Dashboard',
  //      icon: '../../../../assets/icons/Dashbord.svg',
  //    },
  //    {
  //      number: '2',
  //      name: 'Assets',
  //      icon: '../../../../assets/icons/Assets.svg',
  //    },
  //    {
  //      number: '3',
  //      name: 'Software',
  //      icon: '../../../../assets/icons/Software.svg',
  //    },
  //    {
  //      number: '4',
  //      name: 'User',
  //      icon: '../../../../assets/icons/Users.svg',
  //    },
  //    {
  //      number: '5',
  //      name: 'Activity Logs',
  //      icon: '../../../../assets/icons/Logs.svg',
  //    },
  //    // {
  //    //  number:'6',
  //    //  name:'Collapse',
  //    //  icon:'../../../../assets/icons/Group.svg',
  //    // }
  //  ];

  //  toggleSidebar() {
  //    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  //  }
  isCollapsed = true;
  selectedIcon: string = ''; 

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  constructor(private cdr: ChangeDetectorRef) { }

  highlightIcon(icon: string) {
    this.selectedIcon = icon;
    this.cdr.detectChanges();
  }

  isIconSelected(icon: string): boolean {
    return this.selectedIcon === icon;
  }

}
