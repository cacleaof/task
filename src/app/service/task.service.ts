import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
 private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }
    addTask(taskData: Partial<Task>): Observable<Task> {
      return this.http.post<Task>(this.apiUrl, taskData);
    }

    getTasks(): Observable<Task[]> {
      return this.http.get<Task[]>(this.apiUrl+'tasks');
    }
}
