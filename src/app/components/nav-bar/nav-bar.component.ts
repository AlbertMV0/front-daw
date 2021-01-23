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

  ngAfterViewInit() {
   
  }
  ngOnInit(): void {    
    console.log(this.userService.getNivelUsuario());
    
    if (localStorage.getItem('token')) {
      this.loggedUser = 1;
    } else {
      console.log();
      
      this.loggedUser = 0;
      console.log("no registrado");
    }
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



}

