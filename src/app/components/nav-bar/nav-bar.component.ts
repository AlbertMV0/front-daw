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
  public usuario: any;

  ngAfterViewInit() {
   
  }
  ngOnInit(): void {
   /* this.usuario = this.usuarioDatos;
    if (!this.usuario) {
      this.userService.getActiveUser().subscribe((loggedUser: any) => {
        this.usuario = loggedUser;
        if (!this.usuario) {
          sessionStorage.removeItem('token');
          this.router.navigate(['/login']);
        } else {
          this.initForm();
        }
      });
    } else {
      this.initForm();
    }
    console.log('usu', this.usuario);*/
  }
public register(){
  this.userService.register().subscribe((results)=>{
    console.log("funciono "+JSON.stringify(results));
    
  }, (error)=>{
    console.log("error "+error);
    
  })
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

