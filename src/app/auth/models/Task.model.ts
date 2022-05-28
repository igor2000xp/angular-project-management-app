export interface Task {
  title: string,
  id?: string,
  order: number,
  description: string,
  userId: string,
  boardId?: string,
  columnId?: string
  done?:boolean,
}
