import { Component } from '@angular/core';
import { DisplayDetailsService } from '../shared/services/display-details.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  displayingData: any[] = [];

  constructor(private DisplayingDetailsService: DisplayDetailsService) {
    this.displayingData = [];
  }
  
  ngOnInit(): void {
    this.showUserListData();
  }

  showUserListData() {
    this.DisplayingDetailsService.getshowUserListData().subscribe(
      (data) => {
        this.displayingData = data;
        console.log(this.displayingData);
      },
      (error) => {
        console.log(error);

      }
    )
  }

}
