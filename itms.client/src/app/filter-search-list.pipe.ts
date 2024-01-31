import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearchList'
}) 
export class FilterSearchListPipe implements PipeTransform {

  transform(value: any, searchFilter: any): any {
    let filter = searchFilter.toLowerCase();

    return value.filter((user: any) => {
      return (
        user.firstName.toLowerCase().includes(filter) ||
        user.lastName.toLowerCase().includes(filter) ||
        user.cgiid.toLowerCase().includes(filter)
      );
    });
  }
  
}
