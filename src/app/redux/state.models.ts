import { Board } from '../auth/models/Board.model';
import { Column } from '../auth/models/Column.model';
import { ITasksState } from './reducers';

export interface IAppState {
  users: IUsersState;
  tasks: ITasksState;
  board: IBoardsState;
  columns: IColumnState;
}
export interface IUsersState {
  users: IUser[] | null;
  currentUser: IUser | null | any;
  isUserFetched: boolean;
}
export interface IBoardsState {
  boards: Board[] | null;
  currentBoard: Board | null;
}
export interface IColumnState {
  columns: Column[];
  currentColumn: Column;
}
export interface IUser {
  id?: string;
  name?: string;
  login?: string;
  password?: string;
  isUserFetched?: boolean;
  token?: string;
}
export interface ITask {
  id: string;
  title?: string;
  order: number;
  description?: string;
  userID?: string;
  boardID?: string;
  columnId?: string;
}
export interface IBoard {
  id: string;
  title: string;
}
export interface IColumn {
  id?: string;
  title?: string;
  order: number;
}
