import { Component, OnInit } from '@angular/core';
import { ClaseService } from 'src/app/services/clase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/usuario.service';
import { Metodos } from 'src/app/services/metodos';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.scss']
})
export class ClaseComponent extends Metodos implements OnInit {

  constructor(private claseService: ClaseService, public userService: UserService, private activatedRoute: ActivatedRoute,) {
    super(userService)
  }
  user: any;
  clase: any;
  alumnos: any;
  profesor: any;
  informacion: any;

  ngOnInit(): void {
  
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.claseService.getClase(id).subscribe((result => {
      console.log("ver clase");
      this.clase = result;
      this.alumnos = this.clase.alumnos;
      console.log(this.clase);
      console.log(this.user);
      console.log( this.alumnos);
      
    }), (error => {
      console.log("error");
    }));

    this.usuarioDatos().subscribe((result => { 
      let continuar=true;

      this.user = result; 
      if (this.user.nivel == 1) {
        this.alumnos.forEach(element => {
          element.disponible = true;
        });
      }else if (this.user.nivel == 0) {
        this.alumnos.forEach(alumnoClase => {

          this.user.alumnos.forEach(element => {
            if(alumnoClase.id_alumno==element.id_alumno){
              console.log(alumnoClase.id_alumno + " true "+ element.id_alumno);
              
              alumnoClase.disponible=true;
              continuar=false;
            }else if(continuar){
              console.log(alumnoClase.id_alumno + " false  "+ element.id_alumno);
              alumnoClase.disponible=false;
              continuar=true;
            }
          });
          

        });
      }
    }));

  }



}
