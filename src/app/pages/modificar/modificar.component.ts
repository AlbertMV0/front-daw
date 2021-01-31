import { Component, OnInit } from '@angular/core';
import { EditarComponent } from 'src/app/components/editar-alumno/editar.component';
import { EditarUsuarioComponent } from 'src/app/components/editar-usuario/editar-usuario.component';
import { EditarClaseComponent } from 'src/app/components/editar-clase/editar-clase.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private router: Router) { }

  usuarios: any;
  alumnos: any;
  clases: any;

  ngOnInit(): void {
    let tipo = this.activatedRoute.snapshot.paramMap.get('tipo');
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.usuarios = false; this.alumnos = false; this.clases = false;

    if (tipo == "usuarios") {
      this.usuarios = true;
    } else if (tipo == "alumnos") {
      this.alumnos = true;
    } else if (tipo == "clases") {
      this.clases = true;
    }
  }
}


