import { Column } from './Column.model';

export interface Board {
  id?: string,
  title?: string,
  columns? : Column[],
}
