import { Pipe, PipeTransform } from '@angular/core';;

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value : any[], filterString: string, property:string): any[] {
    if(!value || filterString==='' || property ==='') {
      return value;
    }
    let filteredItems: any= []
    for (let item of value) {
      if (item[property].toLowerCase().includes(filterString.toLowerCase())) {
        filteredItems.push(item);
      }
    }
    return filteredItems;
  }

}