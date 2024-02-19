import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearchList'
})
export class FilterSearchListPipe implements PipeTransform {

  transform(value: any, searchFilter: any): any {
    if (!value || !Array.isArray(value) || !searchFilter) return value;

    const filters = searchFilter.trim().toLowerCase().split(' ');

    return value.filter((user: any) => {
      return filters.every((filter: any) =>
        user.firstName.toLowerCase().includes(filter) ||
        user.lastName.toLowerCase().includes(filter) ||
        user.cgiid.toLowerCase().includes(filter)
      );
    });
  }
}
