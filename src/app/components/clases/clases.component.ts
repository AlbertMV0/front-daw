import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.scss']
})
export class ClasesComponent implements OnInit {

  constructor(private userService: UserService,private router: Router) { }
  clases: any;

  ngOnInit(): void {
    this.userService.getAllClases().subscribe((result => {
      console.log(result);
      this.clases = result;
    }), (error => {
      console.log("Error " + error);

    }));
  }

  public editClase(clase){
    this.router.navigate(['modificar/clases/'+clase.id_clase]);
  }
}
