import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any {
    console.log('Items:', items);
    console.log('SearchText:', searchText);

    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      const typeNameMatches = typeof item.typeName === 'string' && item.typeName.toLowerCase().includes(searchText);
      const matchingCategory = Array.isArray(item.categories) &&
        item.categories.find((category: { name: string }) => category.name && category.name.toLowerCase().includes(searchText));
      console.log(matchingCategory);
      return typeNameMatches || matchingCategory;
    });
  }

  }




  

    
  

