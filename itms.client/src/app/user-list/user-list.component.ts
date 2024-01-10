
// Import necessary modules and services
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DisplayDetailsService } from '../shared/services/display-details.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  // Add the DisplayDetailsService to the providers array
  providers: [DisplayDetailsService]
})
export class UserListComponent implements OnInit {
  displayingData: any[] = [];
  filterInput: string = '';

  @Output() userDetailsClicked: EventEmitter<any> = new EventEmitter<any>();

  // Function to emit the clicked user details
  showUserDetails(userDetails: any) {
    this.userDetailsClicked.emit(userDetails);
  }

  constructor(private displayingDetailsService: DisplayDetailsService) {
    // Initialize your class properties here if needed
  }

  ngOnInit(): void {
    this.showUserListData();
  }

  showUserListData() {
    // Use the service to get data
    this.displayingDetailsService.getshowUserListData().subscribe(
      (data) => {
        this.displayingData = data;
        console.log(this.displayingData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  GetUserDetails = (details: any) => {
    console.log(details.id);
    console.log("working");
  }
}
