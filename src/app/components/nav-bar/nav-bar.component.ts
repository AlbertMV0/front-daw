import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/usuario.service';
import { Metodos } from 'src/app/services/metodos';
import { NgbPaginationConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent extends Metodos implements OnInit {

  constructor(public userService: UserService, private router: Router, private modalService: NgbModal) {
    super(userService);
  }

  public loggedUser: any;
  public alumnos: any;
  public clase: any;

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe((result => {
      this.loggedUser = result;
      if (this.loggedUser.nivel == 0) {
        this.alumnos = this.loggedUser.alumnos;
        console.log(this.alumnos);
      } else if (this.loggedUser.nivel == 1) {
        this.clase = this.loggedUser.clase;
        console.log(this.clase);
      }
    }));
  }

  public logout(): void {
    /*openVerticallyCentered() {
      const modal = this.modalService.open(ModalinfoComponent, { centered: true });
      modal.componentInstance.usuario = null;
      modal.componentInstance.pedido = pedido;
      modal.componentInstance.tipo = tipo;
    }*/

    console.log("Cerrando sesion");

    this.userService.logout()
      .subscribe((results: any) => {
        this.router.navigate(['']);
      },
        (error) => { console.error(error) }
      );
  }

  public verClase(alumno = null) {
    if (alumno != null) {
      this.router.navigate(['clase/' + alumno]);
    }
    this.router.navigate(['clase/' + this.clase.id_clase]);
  }
}

