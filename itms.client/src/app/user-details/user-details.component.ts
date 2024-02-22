
import { EmployeeService } from '../shared/services/Employee.service';
import { DisplayDetailsService } from '../shared/services/display-details.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  @Input() userDetails: any;
  @Input() laptopDetails: any;
  @Input() softwareDetails: any;
  @Input() accessoriesDetails: any;

  constructor(private displayingDetailsService: DisplayDetailsService, private employeeService: EmployeeService) {
   
  }

  ngOnInit(): void {
    this.showUserDetails();

  
    
  }
  showUserDetails() {

  }
  isOptionsVisible: boolean = false;

  

  //CHANGES
  selectedItem: string = 'laptop';

 

  selectItem(item: string) {
    this.selectedItem = item;
  }
}
  
