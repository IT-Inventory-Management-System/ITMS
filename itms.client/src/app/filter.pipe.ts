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

    const filteredItems = items.filter(item => {
      const typeNameMatches = typeof item.typeName === 'string' && item.typeName.toLowerCase().includes(searchText);
      const matchingCategory = Array.isArray(item.categories) &&
        item.categories.find((category: { name: string }) => category.name && category.name.toLowerCase().includes(searchText));
      //console.log(matchingCategory);
      return typeNameMatches || matchingCategory;
    });

    const modifiedFilteredItems = filteredItems
      .map(item => ({
        ...item,
        categories: item.categories.filter((category: { name: string }) => category.name && category.name.toLowerCase().includes(searchText))
      }))
      .filter(item => item.categories.length > 0);

    console.log('Filtered Items:', modifiedFilteredItems);

    return modifiedFilteredItems;

  }

}




  

    
  

