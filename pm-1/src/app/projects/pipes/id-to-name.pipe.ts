import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idToName'
})
export class IdToNamePipe implements PipeTransform {

  transform(value: number, List: any[]): any {
    return List?.find(data => data.id == value)?.name
  }

}
