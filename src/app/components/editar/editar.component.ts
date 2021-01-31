import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/usuario.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  constructor(private form_builder: FormBuilder, private userService: UserService, private alumnoService: AlumnoService, private activatedRoute: ActivatedRoute) { }

  user: any;
  alumno: any;
  alumnoForm: FormGroup;
  items = ["Hombre", "Mujer"];

  nombre: any;
  apellidos: any;
  edad: any;
  aficiones: any;
  genero: any;
  alergias: any;

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe((result => {
      this.user = result;
      if (this.user.nivel == 0) {
        this.nombre = true;
        this.apellidos = true;
        this.edad = true;
        this.aficiones = false;
        this.genero = true;
        this.alergias = false;
      } else if (this.user.nivel == 1) {
        this.nombre = true;
        this.apellidos = true;
        this.edad = true;
        this.aficiones = true;
        this.genero = true;
        this.alergias = true;
      } else if (this.user.nivel == 2) {
        this.nombre = false;
        this.apellidos = false;
        this.edad = false;
        this.aficiones = false;
        this.genero = false;
        this.alergias = false;
      }
    }));
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.alumnoService.getAlumno(id).subscribe((result => {
      this.alumno = result;
      console.log(this.alumno);

    }));
    this.alumnoForm = this.form_builder.group({
      nombre: [null, [Validators.pattern('[a-zA-ZÑñ ]*')]],//[null,Validators.compose([Validators.email,Validators.required])]
      apellidos: [null, [Validators.pattern('[a-zA-ZÑñ ]*')]],
      edad: [null, [Validators.pattern('[0-9]*')]],
      aficiones: [null],
      genero: [null],
      alergias: [null],
    });


  }

  public modificar() {
    const formData = this.alumnoForm.getRawValue();
    console.log(formData);
    let data;
    if (this.user.nivel == 0) {
      data = {
        id_alumno: this.alumno.id_alumno,
        nombre: this.alumno.nombre,
        genero:  this.alumno.genero,
        apellidos:  this.alumno.apellidos,
        edad:  this.alumno.edad,
        id_clase:  this.alumno.id_clase,
        aficiones: formData.aficiones, alergias: formData.alergias
      };
    } else if (this.user.nivel == 2) {

    }


    if (this.alumnoForm.valid) {
      this.alumnoService.editAlumno(data).subscribe((result=>{
        console.log("Actualizado!");
      }));
      console.log("Valid");

      console.log(data);

    }
  }


}
