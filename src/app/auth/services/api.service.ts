import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { Board } from '../models/Board.model';
import { Column } from '../models/column.model';
import { Task } from '../models/Task.model';

const BASE = 'http://localhost:4000';
const SIGNUP = `${BASE}/signup`;
const SIGNIN = `${BASE}/signin`;
const USERS = `${BASE}/users`;
const BOARDS = `${BASE}/boards`;

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  public errors$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient) { }


  privatehandleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      this.errors$.next(error.error.message);
      console.log(this.errors$.subscribe(el => console.log(el)));
      return of(result as T);
    };
  }

  public authenticate(user: User, mode: string): Observable<User> {
    const url = mode === 'signup' ? SIGNUP : SIGNIN;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(user);
    return this.httpClient.post<User>(url, body, { headers: headers })
      .pipe(
        catchError(this.privatehandleError<any>([])),
      );
  }

  public getUsers(token: string): Observable<User[]> {
    const headers = new HttpHeaders().set('accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<User[]>(USERS, { headers: headers });
  }

  public getBoards(token: string): Observable<Board[]> {
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .get<Board[]>(BOARDS, { headers: headers });
  }

  public createBoard(token: string, board: Board): Observable<Board> {
    const body = JSON.stringify(board);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .post<Board>(BOARDS, body, { headers: headers });
  }

  public getBoardById(token: string, id: string): Observable<Board> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .get<Board>(`${BOARDS}/${id}`, { headers: headers });
  }

  public deleteBoard(token: string, id: string) {
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .delete(`${BOARDS}/${id}`, { headers: headers });
  }

  public updateBoard(token: string, id: string, board: Board): Observable<Board> {
    const body = JSON.stringify(board);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .put<Board>(`${BOARDS}/${id}`, body, { headers: headers });
  }

  public getColumns(token: string, boardId: string ): Observable<Column[]> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .get<Column[]>(`${BOARDS}/${boardId}/columns`, { headers: headers });
  }

  public createColumn(token: string, boardId: string, column: Column ): Observable<Column> {
    const body = JSON.stringify(column);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .post<Column>(`${BOARDS}/${boardId}/columns`, body, { headers: headers });
  }

  public getColumnById(token: string, boardId: string, columnId: string): Observable<Column> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .get<Column>(`${BOARDS}/${boardId}/columns/${columnId}`, { headers: headers });
  }

  public deleteColumn(token: string, boardId: string, columnId: string) {
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .delete(`${BOARDS}/${boardId}/columns/${columnId}`, { headers: headers });
  }

  public updateColumn(token: string, boardId: string, columnId: string, column: Column): Observable<Column> {
    const body = JSON.stringify(column);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .put<Column>(`${BOARDS}/${boardId}/columns/${columnId}`, body, { headers: headers });
  }

  public getTasks(token: string, boardId: string, columnId: string ): Observable<Task[]> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .get<Task[]>(`${BOARDS}/${boardId}/columns/${columnId}/tasks`, { headers: headers });
  }

  public createTask(token: string, boardId: string, columnId: string, task: Task ): Observable<Task> {
    const body = JSON.stringify(task);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .post<Task>(`${BOARDS}/${boardId}/columns/${columnId}/tasks`, body, { headers: headers });
  }

  public getTaskById(token: string, boardId: string, columnId: string, taskId: string): Observable<Task> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .get<Task>(`${BOARDS}/${boardId}/columns/${columnId}/tasks/${taskId}`, { headers: headers });
  }

  public deleteTask(token: string, boardId: string, columnId: string, taskId: string) {
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .delete(`${BOARDS}/${boardId}/columns/${columnId}/tasks/${taskId}`, { headers: headers });
  }

  public updateTask(token: string, boardId: string, columnId: string, taskId: string,  task: Task ): Observable<Task> {
    const body = JSON.stringify(task);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .put<Task>(`${BOARDS}/${boardId}/columns/${columnId}/tasks/${taskId}`, body, { headers: headers });
  }

}
