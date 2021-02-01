import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usuarioLogeado: any;

  constructor(private http: HttpClient) {
    this.getLoggedUser().subscribe((user: any) => {
      this.usuarioLogeado = user;
    });
  }

  getUsuarios(): Observable<any> {
    return this.http
      .get('http://localhost:8000/api' + '/getAllAlumnos')
      .pipe(map((results) => results));
  }

  login(values): Observable<any> {
    return this.http.post('http://localhost:8000/api/login', values).pipe(
      map((results: any) => {
        console.log(results.user);

        this.usuarioLogeado = results.user;
        console.log(this.usuarioLogeado);
        console.log('Se guarda el token');
        localStorage.setItem('token', results.token);
        return results;
      })
    );
  }

  getActiveUser(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    if (sessionStorage.getItem('token')) {
      return this.http.get('http://localhost:8000/api/usuarioLogeado', httpOptions).pipe(
        map((results) => {
          console.log(results);
          return results;
        }));
    } else {
      return this.logout();
    }
  }

  getAllUsuarios(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.get('http://localhost:8000/api/getAllUsuarios', httpOptions).pipe(
      map((results) => {
        return results;
      }));
  }

  getAllClases(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.get('http://localhost:8000/api/getAllClases', httpOptions).pipe(
      map((results) => {
        return results;
      }));
  }

  getAllAlumnos(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.get('http://localhost:8000/api/getAllAlumnos', httpOptions).pipe(
      map((results) => {
        return results;
      }));
  }

  registerUser(data: any): Observable<any> {

    const params = new HttpParams().set('name', data.nombre)
      .set('apellidos', data.apellidos)
      .set('email', data.email)
      .set('password', data.password)
      .set('telefono', data.telefono)
      .set('direccion', data.direccion)
      .set('nivel', data.tipo);
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.post('http://localhost:8000/api/registerUser', params, httpOptions).pipe(
      map((results) => {
        console.log(results);
        return results;
      }, (error) => {
        console.log("error de la api");
        console.log(error);
      }));

  }

  logout(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.get('http://localhost:8000/api/logout', httpOptions).pipe(
      map((results) => {
        this.usuarioLogeado = null;
        localStorage.removeItem('token');
        console.log(results);
        return results;
      })
    );
  }

  getLoggedUser() {
    //if (localStorage.getItem('token')) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http
      .get('http://localhost:8000/api/usuarioLogeado', httpOptions)
      .pipe(
        map((results) => {
          console.log("Llamamos getLoggedUser: " + JSON.stringify(results));

          return results;
        })
      );
    /*} else {
      return this.logout();
    }*/
  }
  editUser(data: any): Observable<any> {

    const params = new HttpParams()
      .set('name', data.name)
      .set('apellidos', data.apellidos)
      .set('email', data.email)
      .set('password', data.password)
      .set('telefono', data.telefono)
      .set('direccion', data.direccion)
      .set('id_alumno', data.id_alumno)
      .set('estado_civil', data.estado_civil)
      .set('experiencia', data.experiencia)
      .set('id', data.id);

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.post('http://localhost:8000/api/editUser', params, httpOptions).pipe(
      map((results) => {
        console.log(results);
        return results;
      }, (error) => {
        console.log("error de la api");
        console.log(error);
      }));

  }

  getUser(id: any): Observable<any> {
    const params = new HttpParams().set('id', id);

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.post('http://localhost:8000/api/getUser', params, httpOptions).pipe(
      map((results) => {
        console.log(results);
        return results;
      }, (error) => {
        console.log("error de la api");
        console.log(error);
      }));
  }

  
  deleteUser(id: any): Observable<any> {
    const params = new HttpParams().set('id', id);

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.post('http://localhost:8000/api/deleteUser', params, httpOptions).pipe(
      map((results) => {
        console.log(results);
        return results;
      }, (error) => {
        console.log("error de la api");
        console.log(error);
      }));
  }

  getNivelUsuario() {
    //console.log(this.usuarioLogeado);
    return this.usuarioLogeado ? this.usuarioLogeado.nivel : -1;
  }

}
