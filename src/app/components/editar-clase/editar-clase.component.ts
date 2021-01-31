import { Component, OnInit } from '@angular/core';
import { AlumnosComponent } from 'src/app/components/alumnos/alumnos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/usuario.service';
import { ClaseService } from 'src/app/services/clase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosComponent } from 'src/app/components/usuarios/usuarios.component';

@Component({
  selector: 'app-editar-clase',
  templateUrl: './editar-clase.component.html',
  styleUrls: ['./editar-clase.component.scss']
})
export class EditarClaseComponent implements OnInit {
  constructor(private form_builder: FormBuilder, private claseService: ClaseService, private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  claseForm: FormGroup;
  user: any;
  clase: any;


  ngOnInit() {
    this.claseForm = this.form_builder.group({
      nombre: [null, [Validators.pattern('[a-zA-ZÑñ ]*')]],//[null,Validators.compose([Validators.email,Validators.required])]
      id_profesor: [null, [Validators.pattern('[0-9]*')]]
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);

    this.claseService.getClase(id).subscribe((result => {
      this.clase = result;
      console.log(this.clase);

    }));
    this.userService.getLoggedUser().subscribe((result => {
      this.user = result;
    }));

  }

  public modificarClase(): void {
    const formData = this.claseForm.getRawValue();

    const data = {
      id_clase: this.clase.id_clase,
      nombre_clase: formData.nombre,
      id_profesor: formData.id_profesor
    };


    if (this.claseForm.valid) {
      console.log(data);
      this.claseService.editClase(data).subscribe(
        (resultado: any) => {
          console.log("Clase actualizado");
          console.log(resultado);
        },
        error => {
          console.log("Error");
          console.log(error);
          //this.mensajeError = 'Tiene que introducir unos datos válidos';
          //this.error = true;
        }
      );
    } else {
      console.log("Clase no valida");
    }
  }

}
