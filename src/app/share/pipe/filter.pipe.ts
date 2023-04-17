import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: Product[], filterString: string, property: string): Product[] {
    if (!value || filterString === '' || property === '') {
      return value;
    }
    let filteredItems: Product[] = [];
    for (let item of value) {
      if (item['title'].toLowerCase().includes(filterString.toLowerCase())) {
        filteredItems.push(item);
      }
    }
    return filteredItems;
  }
}
