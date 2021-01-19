import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { Usuario } from "../models/usuario";
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable() export class UserService {

  constructor(private http: HttpClient) {}

  getUsuario():Observable <any> {
    return this.http.get('/api/usuario');
  }

  getAllProfe():Observable <any> {
    return this.http.get('/api/usuario');
  }
}

export class UsuarioService {
  constructor() { }
}
