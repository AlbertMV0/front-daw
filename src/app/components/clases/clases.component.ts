import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.scss']
})
export class ClasesComponent implements OnInit {

  constructor(private userService: UserService) { }
  clases: any;

  ngOnInit(): void {
    this.userService.getAllClases().subscribe((result => {
      console.log(result);
      this.clases = result;
    }), (error => {
      console.log("Error " + error);

    }));
  }

}
