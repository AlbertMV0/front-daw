import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

  constructor(private form_builder: FormBuilder, private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  userForm: FormGroup;
  user: any;
  userMostrar: any;
  nivel:any;
  error:any;
  errorMensaje:any;
  mensaje:any;
  ngOnInit() {
    this.userForm = this.form_builder.group({

      nombre: [null, [Validators.pattern('[a-zA-ZÑñ ]*')]],//[null,Validators.compose([Validators.email,Validators.required])]
      apellidos: [null, [Validators.pattern('[a-zA-ZÑñ ]*')]],
      email: [null, [Validators.email]],
      password: [null],
      telefono: [null, [Validators.pattern('[0-9]*')]],
      direccion: [null],
      tipo: [null],
      estado_civil: [null],
      experiencia: [null],
      id_alumno:[null],
    });
    let tipo = this.activatedRoute.snapshot.paramMap.get('tipo');
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(tipo);
    console.log(id);
    
    if (tipo == null || tipo == undefined) {
      this.userService.getLoggedUser().subscribe((result => {
        this.userMostrar = result;
        this.nivel=this.userMostrar.nivel;
        console.log(this.userMostrar);
        console.log("cambiando el propio usuario");       
      }));
    } else {
      this.userService.getUser(id).subscribe((result => {
        this.userMostrar = result;
        console.log("cambiando desde administrador");
        console.log(this.userMostrar);
      }));
      this.userService.getLoggedUser().subscribe((result => {
        this.user = result;
        this.nivel=this.user.nivel;
      }));
    }
  }

  public enviar(): void {
   
    const formData = this.userForm.getRawValue();
    console.log();

    const data = {
      id:this.userMostrar.id,
      name: formData.nombre,
      email: formData.email, password: formData.password,
      apellidos: formData.apellidos, telefono: formData.telefono, direccion: formData.direccion,
      estado_civil: formData.estado_civil, experiencia: formData.experiencia,id_alumno: formData.id_alumno,
    };


    if (this.userForm.valid) {
      console.log(data);
      this.userService.editUser(data).subscribe(
        (resultado: any) => {
          console.log("Usuario actualizado");
          console.log(resultado);
          this.error="mostrar";
          this.mensaje="Datos modificados. Recarge la página para visualizarlos."
        },
        error => {
          this.error="error";
          this.mensaje="Error al modificar los datos. Reviso que sean correctos.";
          console.log("Error");
          console.log(error);
         //this.mensajeError = 'Tiene que introducir unos datos válidos';
         //this.error = true;
        }
      );
    } else {
      console.log("usuario no valido");
      this.error="error";
      this.mensaje="Error al modificar los datos. Reviso que sean correctos.";
    }
  }

}
