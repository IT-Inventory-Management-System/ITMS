import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearchList'
}) 
export class FilterSearchListPipe implements PipeTransform {

  transform(value: any, searchFilter: any): any{
    let name = searchFilter.toLowerCase();
    return value.filter((event : any) => {
      return event.firstName.toLowerCase().indexOf(name) > -1
    });
  }
  
}
