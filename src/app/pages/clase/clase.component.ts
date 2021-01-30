import { Component, OnInit } from '@angular/core';
import { ClaseService } from 'src/app/services/clase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/usuario.service';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.scss']
})
export class ClaseComponent implements OnInit {

  constructor(private claseService: ClaseService, private userService: UserService, private activatedRoute: ActivatedRoute,) { }
  user: any;
  clase:any;
  alumnos:any;
  profesor:any;
  ngOnInit(): void {
    //this.user = this.userService.getLoggedUser();
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.claseService.getClase(id).subscribe((result => {
      console.log("ver clase");
      this.clase=result;
      this.alumnos=this.clase.alumnos;
    console.log(this.clase);

    
    }), (error => {
      console.log("error");

    }));
  }


}
