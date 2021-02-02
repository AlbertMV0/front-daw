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
  mensaje: string;
  error: any;
  errorAlumno:any;
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
      nombre: [null, [Validators.pattern('[a-zA-ZÑñ ]*'),Validators.required]],//[null,Validators.compose([Validators.email,Validators.required])]
      apellidos: [null, [Validators.pattern('[a-zA-ZÑñ ]*'),Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      telefono: [null, [Validators.pattern('[0-9]*'),Validators.maxLength(9)]],
      direccion: [null, [Validators.required]],
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
      this.userService.registerUser(data).subscribe(
        (resultado: any) => {
          console.log("Usuario creado");
          this.mensaje = 'Usuario creado satisfactoriamente';
          this.error = "mostrar";
        },
        error => {
          this.mensaje = 'No se ha podido crear el usuario. Revisa los datos introducidos.';
          this.error = "error";
        }
      );
    } else {
      console.log("usuario no valido");
      this.mensaje = 'No se ha podido crear el usuario. Revisa los datos introducidos.';
    
      this.error = "error";
    }
  }

  public modificar() {
    const formData = this.alumnoForm.getRawValue();
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
      this.alumnoService.registerAlumno(data).subscribe((result => {
        this.mensaje = 'Alumno creado satisfactoriamente';
        this.errorAlumno = "mostrar";
      }), (error => {
        this.mensaje = 'No se ha podido crear el alumno. Revisa los datos introducidos.';
        this.errorAlumno = "error";
      }));

    }else{
      this.mensaje = 'No se ha podido crear el alumno. Revisa los datos introducidos.';
    
    this.errorAlumno ="error";
    }
  }

}
