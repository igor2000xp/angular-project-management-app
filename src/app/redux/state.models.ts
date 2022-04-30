import { ITasksState } from './reducers';

export interface IAppState {
  users: IUsersState;
  tasks: ITasksState;
}
export interface IUsersState {
  users: IUser[] | null;
  currentUser: IUser | null;
  isUserFetched: boolean;
}

export interface IUser {
  id?: string;
  name?: string;
  login?: string;
  password?: string;
  isUserFetched?: boolean;
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
