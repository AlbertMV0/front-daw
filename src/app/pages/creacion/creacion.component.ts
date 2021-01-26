import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.component.html',
  styleUrls: ['./creacion.component.scss']
})
export class CreacionComponent implements OnInit {

  userForm: FormGroup;
  mensajeError: string;
error:boolean;
opciones:string[]=["Padre","Profesor"];

  constructor(private form_builder: FormBuilder, private http: HttpClient,private userService:UserService, private router: Router ) { }

  ngOnInit() {
    //inicializamos la variable form
    this.userForm = this.form_builder.group({
      nombre: [null, [ Validators.required]],//[null,Validators.compose([Validators.email,Validators.required])]
      apellidos: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      telefono: [null, [Validators.maxLength(9), Validators.required]],
      direccion: [null, [Validators.required]],
      tipo: [null, [ Validators.required]],
      //email: [null, [Validators.required]],
    });
  }

  public enviar(): void {
    const formData = this.userForm.getRawValue();
    const data={email:formData.email,password:formData.password,
      apellidos:formData.apellidos,telefono:formData.telefono,direccion:formData.direccion,
    };
    console.log(data);
    
    if (this.userForm.valid) {
    this.userService.login(data).subscribe(
      (usuario:any)  =>
      {
        this.router.navigate(['']);
        console.log("Correcto");
        console.log(usuario);
      },
      error => {
        console.log("Error");
        console.log(error);
        this.mensajeError = 'Tiene que introducir unos datos válidos';
        this.error = true;
      }
    );
    }
  }

}
