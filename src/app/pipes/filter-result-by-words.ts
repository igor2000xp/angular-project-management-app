import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../auth/models/Task.model';
@Pipe({
  name: 'filterResultByWord',
})
export class FilterResultByWord implements PipeTransform {
  transform(list: Task[], word: string, mode: string): Task[] {
    if (!word) return list;
    if (mode === undefined) mode = 'title';
    if (mode === 'title') return list.filter((el) => el.title.includes(word));
    if (mode === 'id') return list.filter((el) => el.id === word);
    if (mode === 'description') return list.filter((el) => el.description.includes(word));

  }
}
