import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
 
list=[
  {
    number:'1',
    name:'Dashboard',
    icon:'fa-solid fa-home',
  },
  {
    number:'2',
    name:'Category',
    icon:'fa-brands fa-windows',
  },
  {
    number:'3',
    name:'Inventory',
    icon:'fa-solid fa-desktop',
  },
  {
    number:'4',
    name:'Employee',
    icon:'fa-solid fa-user',
  },
  {
    number:'5',
    name:'Licence',
    icon:'fa-solid fa-id-card',
  },
  {
    number:'6',
    name:'History',
    icon:'fa-solid fa-clock-rotate-left',
  }
]
}
