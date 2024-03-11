import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-monitor-brand-form',
  templateUrl: './add-monitor-brand-form.component.html',
  styleUrls: ['./add-monitor-brand-form.component.css']
})
export class AddMonitorBrandFormComponent {

  UserId: any;
  userDataJSON: any;
  @Input() selectedOptions: { HDMI: boolean, VGA: boolean, DVI: boolean };

  ngOnChanges(): void{
    console.log(this.selectedOptions);
  }
  ngOnInit(): void {
    this.userDataJSON = localStorage.getItem('user');

    // Parse the JSON string back into an object
    var userData = JSON.parse(this.userDataJSON);

    // Access the 'id' property of the userData object
    this.UserId = userData.id;
  }
}
