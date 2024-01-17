import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-assets',
  templateUrl: './dashboard-assets.component.html',
  styleUrls: ['./dashboard-assets.component.css']
})
export class DashboardAssetsComponent {
  @Input() accessoriesData: any;

}
