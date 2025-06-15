import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Reg } from '../model/reg';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {

  private apiUrl = 'https://adubadica.vercel.app/api/';
  //private apiUrl = 'http://localhost:3000/api/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  addReg(RegData: Partial<Reg>): Observable<Reg> {
    console.log('Dados enviados para API (add):', RegData);
    return this.http.post<Reg>(this.apiUrl+'despesas', RegData, this.httpOptions)
      .pipe(
        catchError(error => {
          console.error('Erro detalhado da API:', error);
          return throwError(() => error);
        })
      );
  }

  updReg(RegData: Partial<Reg>): Observable<Reg> {
    console.log('Dados enviados para API (update):', RegData);
    return this.http.put<Reg>(this.apiUrl+'despesa/' + RegData.id, RegData, this.httpOptions)
      .pipe(
        catchError(error => {
          console.error('Erro ao atualizar registro:', error);
          return throwError(() => error);
        })
      );
  }

  getRegs(): Observable<Reg[]> {
    return this.http.get<Reg[]>(this.apiUrl+'despesas', this.httpOptions)
      .pipe(
        catchError(error => {
          console.error('Erro ao buscar registros:', error);
          return throwError(() => error);
        })
      );
  }

  delReg(id: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + 'despesa/' + id, this.httpOptions)
      .pipe(
        catchError(error => {
          console.error('Erro ao deletar registro:', error);
          return throwError(() => error);
        })
      );
  }
}
