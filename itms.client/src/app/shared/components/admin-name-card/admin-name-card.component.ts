import { Component, Input } from '@angular/core';
import { AdminDetailService } from '../../services/admin-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-name-card',
  templateUrl: './admin-name-card.component.html',
  styleUrls: ['./admin-name-card.component.css']
})
export class AdminNameCardComponent {
  @Input() adminDetail: any = {};
  @Input() index: number;
  isSelected: boolean = false;

  constructor(private adminDetailService: AdminDetailService, private router: Router) {
  }

  ngOnInit() {

    if (this.router.url == '/manage-access') {
      this.adminDetailService.selectedCardIndex$.subscribe(selectedIndex => {
        this.isSelected = this.index === selectedIndex;
      });
    }

    if (this.router.url == '/history') {
      this.adminDetailService.selectedCardIndexActivity$.subscribe(selectedIndex => {
        this.isSelected = this.index === selectedIndex;
      });
    }
   
  }

  onCardClick() {
    this.adminDetailService.setSelectedCardIndex(this.index);
    this.adminDetailService.setSelectedAdmin(this.adminDetail);

    this.adminDetailService.setSelectedCardIndexActivity(this.index);
    this.adminDetailService.setSelectedAdminActivity(this.adminDetail);

  }

 
}
