import { UserService } from 'src/app/services/usuario.service';


export class Metodos {
  constructor(public userService: UserService) {
  }

  public get usuarioLogeado() {
    if (this.userService.getLoggedUser()) {
      console.log("hay usuario");
      
    } else {
      console.log("no hay");
    }
    return this.userService.getLoggedUser();
  }

 /* public get userLevel(): EUsuNivel {
    return this.userService.getUserLevel();
  }

  public get isLogeado(): boolean {
    return this.userService.getUserLevel() > 0;
  }*/

  public get isPadre(): boolean {
    return this.userService.getNivelUsuario() === 0;
  }

  public get isProfesor(): boolean {
    return this.userService.getNivelUsuario() === 1;
  }

  public get isAdmin(): boolean {
    return this.userService.getNivelUsuario() === 2;
  }

}
