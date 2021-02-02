import { UserService } from 'src/app/services/usuario.service';


export class Metodos {
  constructor(public userService: UserService) {
  }

  public usuarioDatos() {
    return this.userService.getLoggedUser();
  }

  public get isLoggedIn(): boolean {
    if (!this.userService.usuarioLogeado) {
      return false;
    } else {
      return this.userService.getNivelUsuario() >= 0;
    }
  }


  public get userLevel(): any {
    return this.userService.getLoggedUser() ? this.userService.usuarioLogeado['nivel'] : -1;
  }

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
