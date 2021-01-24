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
   this.getLoggedUser().subscribe((user:any)=>{
    this.usuarioLogeado = user;
   });
   /* console.log("Llamando a getLoggedUser");
    
    this.getLoggedUser().subscribe((user: any) => {
      console.log(user);
      this.usuarioLogeado = user;
      console.log("usuarioLogeado: "+this.usuarioLogeado);
      
    },error=>{
      console.log("no hay usuario");
      
    });
    /* this.headers=new HttpHeaders({"Accept":"application/json"})*/
  }

  getUsuarios(): Observable<any> {
    /*const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
      }),
    };*/
    return this.http
      .get('http://localhost:8000/api' + '/getAllAlumnos')
      .pipe(map((results) => results));
  }

  login(values): Observable<any> {
    return this.http.post('http://localhost:8000/api/login', values).pipe(
      map((results: any /*results:ModeloUsuario*/) => {
        console.log(results.user);
        
        this.usuarioLogeado =results.user;
        console.log( this.usuarioLogeado);
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
      return this.http.get('http://localhost:8000/api/usuarioLogeado',httpOptions).pipe(
        map((results) => {
          console.log(results);
          return results;
        }));
    } else {
      return this.logout();
    }
  }

  register(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    if (sessionStorage.getItem('token')) {
      return this.http.post('http://localhost:8000/api/register',null,httpOptions).pipe(
        map((results) => {
          console.log(results);
          return results;
        }));
    } else {
      return this.logout();
    }
  }

  logout(): Observable<any> {
    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    /*var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjI0NmQ0NGViYmNmODk2YzE3OWY1YTUyNTM3MGRmYWQ3ZmZiN2I0YjMxNWViMjVjMzJlYjM3ZThkOTQ1MWMwZGIzN2RhMGZmNjk2YzI2YWVjIn0.eyJhdWQiOiIzIiwianRpIjoiMjQ2ZDQ0ZWJiY2Y4OTZjMTc5ZjVhNTI1MzcwZGZhZDdmZmI3YjRiMzE1ZWIyNWMzMmViMzdlOGQ5NDUxYzBkYjM3ZGEwZmY2OTZjMjZhZWMiLCJpYXQiOjE2MTEzNjY2NzksIm5iZiI6MTYxMTM2NjY3OSwiZXhwIjoxNjQyOTAyNjc5LCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.KvlLSyglAwEc7zV7gC2D6CvkLWVgqjXZ2yhRlU5dSmds29uBByXuYzXF2FSvXXuUVezgzqX4Go76eJ1quybRYDY9VbKH6VPm0m9TxjhcUGCj08TRsXPi-gper6cr4q-UCcNejP5dPI2r9er1fpQvAJ1kodqcL8GsD8207LPagnVMxGHQ2xwwFOnMmSP_H9BE5K-IZ3zzoa9AXRbhYQHFqcg1uSrO3dfe30xGqznAG7hf0k4MtNOBNjQX9ezxaSWl5wED-RZB3Sy3A8LTrM5uvb0XFPguc5KQYJDIrleHfbrZEIqYOMigYvAHq2Yv9cZO3v9c29uv--W6JxVmzeWqeu24_PNBTEurK8bH-ULzVQxf35InY_0zgLVimnLOlmhGFw8s9hcG74fXSDg5jDIkssg6RuKEwuiO9msgX_zqn5Ev9Nqsjf4SvxNEiinLyRXXF-Idam68P10sr5eByYaqSdeF5qTQg6ilo4VPpAKu2kVBJYiJ8XlRHVqCr3H8xHJR1lwfmbqS_dooAWpZ8WgtrRkvPM38QMmTc-XDT3iW5e8x3gKDVaZrPDTF3F5PxXKr08A9k-IqevsBxsdOPxlXfltFU6TdStEk6mdvbvpAZtbrv93jyT0zdT1IGtX7QA5BhlSBWiPppg0olM28dz3UIs-6Wld3xyigRfcNhRMmMa4");
    
    var formdata = new FormData();
    
    var requestOptionss = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("http://localhost:8000/api/logout", requestOptionss)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
*/

    let header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

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
            console.log("Llamamos getLoggedUser: "+JSON.stringify(results));
            
            return results;
          })
        );
    /*} else {
      return this.logout();
    }*/
  }

  getNivelUsuario(){
    //console.log(this.usuarioLogeado);
    return this.usuarioLogeado ? this.usuarioLogeado.nivel : -1 ;
  }
}