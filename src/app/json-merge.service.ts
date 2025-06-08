import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, throwError, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonMergeService {

  constructor(private http: HttpClient) { }

  mergeJsonFiles(projetosPath: string, newprojPath: string): Observable<any> {
    const projetos$ = this.http.get(projetosPath).pipe(
      map(res => res as any[])
    );

    const newproj$ = this.http.get(newprojPath).pipe(
      map(res => res as any[])
    );

    return forkJoin({
      projetos: projetos$,
      newproj: newproj$
    }).pipe(
      map(({ projetos, newproj }) => ([...projetos, ...newproj])),
      catchError(error => {
        console.error('Ocorreu um erro ao mesclar os arquivos JSON:', error);
        return throwError(() => error);
      })
    );
  }
}
