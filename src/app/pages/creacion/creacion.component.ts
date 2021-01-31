import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/usuario.service';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.component.html',
  styleUrls: ['./creacion.component.scss']
})
export class CreacionComponent implements OnInit {

  userForm: FormGroup;
  mensajeError: string;
  error: boolean;
  opciones: string[] = ["Padre", "Profesor"];
  alumnoForm: FormGroup;
  items = ["Hombre", "Mujer"];

  selectedSimpleItem = '';
  simpleItems = [];


  constructor(private alumnoService: AlumnoService, private form_builder: FormBuilder, private http: HttpClient, private userService: UserService, private router: Router) { }

  ngOnInit() {
    //this.selectedSimpleItem = this.opcione;
    this.simpleItems = ["Profesor", 'Padre/Tutor legal'];
    //inicializamos la variable form
    this.userForm = this.form_builder.group({
      nombre: [null, [Validators.required]],//[null,Validators.compose([Validators.email,Validators.required])]
      apellidos: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      telefono: ["", [Validators.maxLength(9)]],
      direccion: ["", []],
      tipo: [null, [Validators.required]],
    });

    this.alumnoForm = this.form_builder.group({
      nombre: [null, [Validators.pattern('[a-zA-ZÑñ ]*'), Validators.required]],//[null,Validators.compose([Validators.email,Validators.required])]
      apellidos: [null, [Validators.pattern('[a-zA-ZÑñ ]*',), Validators.required]],
      edad: [null, [Validators.pattern('[0-9]*'), Validators.required]],
      aficiones: [null],
      genero: [null, Validators.required],
      alergias: [null],
      id_clase: [null, [Validators.pattern('[0-9]*'), Validators.required]],
    });
  }

  public enviar(): void {
    const formData = this.userForm.getRawValue();
    console.log();

    const data = {
      nombre: formData.nombre,
      email: formData.email, password: formData.password,
      apellidos: formData.apellidos, telefono: formData.telefono, direccion: formData.direccion,
      tipo: formData.tipo
    };


    if (this.userForm.valid) {
      console.log(data);
      if (data['tipo'] == "Profesor") {
        data['tipo'] = 1;
      } else {
        data['tipo'] = 0;
      }
      console.log(data['tipo']);

      this.userService.registerUser(data).subscribe(
        (resultado: any) => {
          console.log("Usuario creado");
          console.log(resultado);
        },
        error => {
          console.log("Error");
          console.log(error);
          this.mensajeError = 'Tiene que introducir unos datos válidos';
          this.error = true;
        }
      );
    } else {
      console.log("usuario no valido");

    }
  }

  public modificar() {
    const formData = this.alumnoForm.getRawValue();
    console.log(formData);
    let data;
    data = {
      nombre: formData.nombre,
      genero: formData.genero,
      apellidos: formData.apellidos,
      edad: formData.edad,
      id_clase: formData.id_clase,
      aficiones: formData.aficiones, alergias: formData.alergias
    };

    if (this.alumnoForm.valid) {
      console.log(data);
      this.alumnoService.registerAlumno(data).subscribe((result => {
        console.log("alumno creado");
      }));
      console.log("Valid");
      console.log(data);
    }
  }

}
