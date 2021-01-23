import { Component, OnInit } from '@angular/core';
import { AlumnosComponent } from 'src/app/components/alumnos/alumnos.component';
import { ClasesComponent } from 'src/app/components/clases/clases.component';
import { UsuariosComponent } from 'src/app/components/usuarios/usuarios.component';
//import { UsuariosComponent } from 'src/app/components/usuarios/usuarios.component';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent implements OnInit {
  dummyComponent = UsuariosComponent;

  constructor() { }

  ngOnInit(): void {
  }

  assingComponent(component) {
    if (component === 'usuarios') {
      this.dummyComponent = UsuariosComponent;
    } else if (component === 'alumnos') {
      this.dummyComponent = AlumnosComponent;
    } else if (component === 'clases') {
      this.dummyComponent = ClasesComponent;
    }
  }
}
