import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proj } from '../model/proj';

@Injectable({
  providedIn: 'root'
})
export class ProjService {
  private apiUrl = 'https://adubadica.vercel.app/api/';
  //private apiUrl = 'http://localhost:3000/api/';

    private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  addProjeto(projetoData: { nome: string, descricao: string }): Observable<Proj> {
    return this.http.post<Proj>(this.apiUrl+'proj', projetoData, this.httpOptions);
  }

  getProjetos(): Observable<Proj[]> {
    return this.http.get<Proj[]>(this.apiUrl+'projs');
  }
}
