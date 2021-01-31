import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http: HttpClient) {}

  
  getAlumno(id:any): Observable<any> {

    const params = new HttpParams().set('id', id);
  const httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

    return this.http.post('http://localhost:8000/api/getAlumno',params,httpOptions).pipe(
      map((results) => {
        console.log(results);
        return results;
      },(error) => {
        console.log("error de la api");
        console.log(error);
      }));
  
}
}
