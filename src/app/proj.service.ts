import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proj } from '../app/model/proj';

@Injectable({
  providedIn: 'root'
})
export class ProjService {
  private apiUrl = 'http://localhost:3000/projetos';

  constructor(private http: HttpClient) { }

  addProjeto(projetoData: { nome: string }): Observable<Proj> {
    return this.http.post<Proj>(this.apiUrl, projetoData);
  }

  getProjetos(): Observable<Proj[]> {
    return this.http.get<Proj[]>(this.apiUrl);
  }
}
