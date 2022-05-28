import { Column } from './Column.model';
import { InfoForBoard } from '../../redux/effects/board.effects';

export interface Board {
  id?: string,
  title?: string,
  columns? : Column[],
  info?:InfoForBoard;
  description?: string,
}
