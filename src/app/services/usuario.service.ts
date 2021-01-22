import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Usuario } from "../models/usuario";
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable(
{providedIn:'root'

  /*constructor(private http: HttpClient) {}

  getUsuario():Observable <any> {
    return this.http.get('/api/usuario');
  }

  getAllProfe():Observable <any> {
    return this.http.get('/api/usuario');
  }*/
})

export class UserService {
  headers:HttpHeaders;
  constructor(private http:HttpClient) { this.headers=new HttpHeaders({"Accept":"application/json"})};

  /*login(values): Observable<any> {
    return this.http.post(environment.url + '/login', values).pipe(
      map((loggedUser: IUsuario) => {
        sessionStorage.setItem('token', loggedUser.sessionId);
        return this.loggedUser = loggedUser;
      })
    );
  }
  */

  getUsuarios(): Observable<any> {
    /*const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
      }),
    };*/
    return this.http.get('http://localhost:8000/api'+ '/getAllAlumnos')
    .pipe(map((results) => results));
  }
  
  login(values): Observable<any> {
    
   
    return this.http.post('http://localhost:8000/api/login',values)
    .pipe(map((results/*results:ModeloUsuario*/) => {
      return results;
    }

     ));
  }
}
