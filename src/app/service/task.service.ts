import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    //private apiUrl = 'https://adubadica.vercel.app/api/';
 private apiUrl = 'http://localhost:3000/api/';
   private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })}

  constructor(private http: HttpClient) { }
    addTask(taskData: Partial<Task>): Observable<Task> {
      return this.http.post<Task>(this.apiUrl+'task', taskData);
    }

    getTasks(): Observable<Task[]> {
      return this.http.get<Task[]>(this.apiUrl+'tasks');
    }
    updTask(RegData: Partial<Task>): Observable<Task> {
        console.log('Dados enviados para API (update):', RegData);
        return this.http.put<Task>(this.apiUrl+'task/' + RegData.id, RegData, this.httpOptions)
          .pipe(
            catchError(error => {
              console.error('Erro ao atualizar registro:', error);
              return throwError(() => error);
            })
          );
      }

    delTask(id: string): Observable<any> {
        return this.http.delete<any>(this.apiUrl + 'task/' + id, this.httpOptions)
          .pipe(
            catchError(error => {
              console.error('Erro ao deletar registro:', error);
              return throwError(() => error);
            })
          );
      }
}
