import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.css']
})
export class RecentActivityComponent {
  @Input() logsData: any;
  @Input() selectedLocation: any;

  //localizeDateStr(date_to_convert_str:string):string{
  //  //var date_to_convert = new Date(date_to_convert_str);
  //  //var local_date = new Date();
  //  //date_to_convert.setHours(date_to_convert.getHours() + local_date.getTimezoneOffset());
  //  //return date_to_convert.toString();

  //  var newDate = new Date(date_to_convert_str.getTime() + date_to_convert_str.getTimezoneOffset() * 60 * 1000);

  //  var offset = date_to_convert_str.getTimezoneOffset() / 60;
  //  var hours = date_to_convert_str.getHours();

  //  newDate.setHours(hours - offset);

  //  return newDate;
  //}

  localizeDateStr(date_to_convert_str: string): string {
    const date_to_convert = new Date(date_to_convert_str);
    const local_offset = date_to_convert.getTimezoneOffset() * 60 * 1000; 
    const local_time = date_to_convert.getTime() - local_offset;
    const local_date = new Date(local_time);
    return local_date.toString();
  }



  newlocalizeDateStr(date_to_convert_str: string): string {
    //alert(this.selectedLocation);
    const date_to_convert = new Date(date_to_convert_str);
    const local_date = new Date();
    if (this.selectedLocation == "India") {
      const timezoneOffset = 5.5 * 60;
      date_to_convert.setMinutes(date_to_convert.getMinutes() + timezoneOffset);
      return date_to_convert.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true });
    } else if (this.selectedLocation == "USA") {
      const timezoneOffset = -6 * 60;
      date_to_convert.setMinutes(date_to_convert.getMinutes() + timezoneOffset);
      return date_to_convert.toLocaleString('en-US', { timeZone: 'America/Chicago', hour12: true });
    }
    return "";
  }


}
