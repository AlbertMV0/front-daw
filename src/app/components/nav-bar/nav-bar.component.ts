import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/usuario.service';
import { Metodos } from 'src/app/services/metodos';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent extends Metodos implements OnInit {

  constructor(public userService: UserService, private router: Router) {
    super(userService);
  }

  public loggedUser: any;
  public alumnos: any;
  public clase:any;

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe((result => {
      this.loggedUser = result;
      if (this.loggedUser.nivel == 0) {
        this.alumnos = this.loggedUser.alumnos;
        console.log(this.alumnos);
      }else if(this.loggedUser.nivel == 1){
        this.clase=this.loggedUser.clase;
      }
    }));
  }

  public register() {
    console.log("register");

  }
  public logout(): void {
    console.log("Cerrando sesion");

    this.userService.logout()
      .subscribe((results: any) => {
        this.router.navigate(['']);
        console.log(results);
      },
        (error) => { console.error(error) }
      );
  }

  public verClase() {
   

    // this.router.navigate(['clase/']);
  }
}

