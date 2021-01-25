import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {

  constructor(private userService: UserService) { }
  alumnos: any;
  totalItems: number;
  activePage = 1;
  itemsPerPage = 6;
  showPagination: boolean;

  ngOnInit(): void {
    this.userService.getAllAlumnos().subscribe((result => {
      console.log(result);
      if (result.length == 0) {
        this.alumnos = [];
        this.showPagination = false;
      } else {
        this.alumnos = result;
        this.totalItems = result.length;
        this.showPagination = true;
      }
      this.alumnos = result;
    }), (error => {
      console.log("Error " + error);
    }));
  }

}
