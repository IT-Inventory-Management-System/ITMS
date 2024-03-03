import { Component, Input } from '@angular/core';
import { AdminDetailService } from '../../services/admin-detail.service';

@Component({
  selector: 'app-admin-name-card',
  templateUrl: './admin-name-card.component.html',
  styleUrls: ['./admin-name-card.component.css']
})
export class AdminNameCardComponent {
  @Input() adminDetail: any = {};
  @Input() index: number;
  isSelected: boolean = false;

  constructor(private adminDetailService: AdminDetailService) {
  }

  ngOnInit() {
    this.adminDetailService.selectedCardIndex$.subscribe(selectedIndex => {
    //  console.log('indx ', this.index, 'select ', selectedIndex)
      this.isSelected = this.index === selectedIndex;
    });
  }

  onCardClick() {
    this.adminDetailService.setSelectedCardIndex(this.index);
    this.adminDetailService.setSelectedAdmin(this.adminDetail);

  }

 
}
