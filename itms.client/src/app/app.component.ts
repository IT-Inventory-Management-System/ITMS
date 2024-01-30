import { Component } from '@angular/core';
import { DataService } from './shared/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'common-layout';

  constructor(private dataService: DataService) {
    this.dataService.getFirstUser().subscribe(
      (data) => {
        localStorage.setItem("user", JSON.stringify(data));
      },
      (error) => {
        console.log("User not found");
      });
  }

}
