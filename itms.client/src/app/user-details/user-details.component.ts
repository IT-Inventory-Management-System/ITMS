import { Component } from '@angular/core';
import { DisplayDetailsService } from '../shared/services/display-details.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  constructor(private displayingDetailsService: DisplayDetailsService) {
    // Initialize your class properties here if needed
  }

  ngOnInit(): void {
    this.showUserDetails();
  }
  showUserDetails() {

  }
}
  @Input() userDetails: any;
}
