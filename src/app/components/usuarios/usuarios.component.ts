import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { runInThisContext } from 'vm';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})

export class UsuariosComponent implements OnInit {

  constructor(private userService: UserService,private router: Router) { }

  usuarios: any;
  totalItems: number;
  activePage = 1;
  itemsPerPage = 6;
  showPagination: boolean;

  ngOnInit(): void {
    this.userService.getAllUsuarios().subscribe((result => {
      if (result.length == 0) {
        this.usuarios = [];
        this.showPagination = false;
      } else {
        this.usuarios = result;
        this.totalItems = result.length;
        this.showPagination = true;
      }
      this.usuarios = result;
    }), (error => {
      console.log("Error " + error);

    }));
  }

  public editUsuario(usuario){
    this.router.navigate(['modificar/usuarios/'+usuario.id]);
  }

  public borrarUsuario(usuario){
    this.userService.deleteUser(usuario.id).subscribe((result=>{
      console.log("borrado");
    }));
  }

}
