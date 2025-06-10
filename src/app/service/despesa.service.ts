import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reg } from '../model/reg';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {

   private apiUrl = 'http://localhost:3000/registros';

  constructor(private http: HttpClient) { }
    addReg(RegData: Partial<Reg>): Observable<Reg> {
      return this.http.post<Reg>(this.apiUrl, RegData);
    }

    getRegs(): Observable<Reg[]> {
      return this.http.get<Reg[]>(this.apiUrl);
    }
}
