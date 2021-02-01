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

  constructor(private http: HttpClient) { }


  editAlumno(data: any): Observable<any> {
    const params = new HttpParams().set('id_alumno', data.id_alumno)
    .set('edad', data.edad)
    .set('nombre', data.nombre)
    .set('apellidos', data.apellidos)
    .set('aficiones', data.aficiones)
    .set('alergias', data.alergias)
    .set('id_clase', data.id_clase)
    .set('genero', data.genero);
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.post('http://localhost:8000/api/editAlumno', params, httpOptions).pipe(
      map((results) => {
        console.log(results);
        return results;
      }, (error) => {
        console.log("error de la api");
        console.log(error);
      }));
  }

  registerAlumno(data: any): Observable<any> {
    const params = new HttpParams()
    .set('edad', data.edad)
    .set('nombre', data.nombre)
    .set('apellidos', data.apellidos)
    .set('aficiones', data.aficiones)
    .set('alergias', data.alergias)
    .set('id_clase', data.id_clase)
    .set('genero', data.genero);
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.post('http://localhost:8000/api/createAlumno', params, httpOptions).pipe(
      map((results) => {
        console.log(results);
        return results;
      }, (error) => {
        console.log("error de la api");
        console.log(error);
      }));
  }

  getAlumno(id: any): Observable<any> {
    const params = new HttpParams().set('id', id);
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.post('http://localhost:8000/api/getAlumno', params, httpOptions).pipe(
      map((results) => {
        console.log(results);
        return results;
      }, (error) => {
        console.log("error de la api");
        console.log(error);
      }));
  }

  addComentario(data:any): Observable<any> {
    const params = new HttpParams().set('id_alumno', data.id_alumno)
    .set('comentario', data.comentario);
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.post('http://localhost:8000/api/addComentario', params, httpOptions).pipe(
      map((results) => {
        console.log(results);
        return results;
      }, (error) => {
        console.log("error de la api");
        console.log(error);
      }));
  }

  verComentario(id:any): Observable<any> {
    const params = new HttpParams().set('id_alumno', id)
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.post('http://localhost:8000/api/verComentarios', params, httpOptions).pipe(
      map((results) => {
        console.log(results);
        return results;
      }, (error) => {
        console.log("error de la api");
        console.log(error);
      }));
  }

  
  deleteAlumno(id: any): Observable<any> {
    const params = new HttpParams().set('id_alumno', id);

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.post('http://localhost:8000/api/deleteAlumno', params, httpOptions).pipe(
      map((results) => {
        console.log(results);
        return results;
      }, (error) => {
        console.log("error de la api");
        console.log(error);
      }));
  }
}
