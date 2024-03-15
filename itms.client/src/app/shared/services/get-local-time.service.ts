import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetLocalTimeService {

  constructor() { }

  localizeDateStr(date_to_convert_str: string): string {
    const date_to_convert = new Date(date_to_convert_str);
    const local_offset = date_to_convert.getTimezoneOffset() * 60 * 1000;
    const local_time = date_to_convert.getTime() - local_offset;
    const local_date = new Date(local_time);
    return local_date.toString();
  }
}
