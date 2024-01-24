import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DisplayDetailsService } from '../shared/services/display-details.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  
  providers: [DisplayDetailsService]
})

export class UserListComponent implements OnInit {
  displayingData: any[] = [];
  filterName: string = '';
  selectedUserIndex: number = 0;


  @Output() userDetailsClicked: EventEmitter<any> = new EventEmitter<any>();

  
  showUserDetails(userDetails: any, index: number) {
   
    this.displayingData.forEach(user => {
      user.isSelected = false;
    });

  
    this.displayingData[index].isSelected = true;

    this.userDetailsClicked.emit(userDetails);
    
  }

  constructor(private displayingDetailsService: DisplayDetailsService) {
  }

  ngOnInit(): void {
    this.showUserListData();
    if (this.displayingData.length > 0) {
      this.showUserDetails(this.displayingData[0],0);
    }
  }

  showUserListData() {
    this.displayingDetailsService.getshowUserListData().subscribe(
      (data) => {
        this.displayingData = data;
        this.displayingData = data.sort((a, b) => a.cgiid.localeCompare(b.cgiid));
        console.log(this.displayingData);

        if (this.displayingData.length > 0) {
          this.showUserDetails(this.displayingData[0],0);
        }


      },
      (error) => {
        console.log(error)
      }
    );
  }

  GetUserDetails = (details: any) => {
    console.log(details.id);
    console.log("working");
  }
}
