export interface IAppState {
  users: IUserState[];
  token: string;
  boards: IBoard[];
  columns: IColumn[];
  authState: boolean;
}
export const initialState:IAppState = {
  users: [],
  token: '',
  boards: [],
  columns: [],
  authState: false,
};

export interface IUserState {
  id: string;
  name?: string;
  login: string;
  password?: string;
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
