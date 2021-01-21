import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private form_builder: FormBuilder, private http: HttpClient,private userService:UserService ) { }

  ngOnInit() {
    //inicializamos la variable form
    this.loginForm = this.form_builder.group({
      email: [null, [Validators.email, Validators.required]],//[null,Validators.compose([Validators.email,Validators.required])]
      password: [null, Validators.required]

    });
  }
  public enviar(): void {
    const formData = this.loginForm.getRawValue();
    const data={username:formData.email,password:formData.password,grant_type:'password',client_id:2,client_secret:'MNdrVWGylx9oVtRRBW1dMlsLFcqlGdZkmk1x7JvI',scope:'*'};
    console.log(data);
    
    if (this.loginForm.valid) {
    this.userService.login(data).subscribe(
      (usuario:any)  =>
      {
        console.log("Correcto");
        console.log(usuario);

      },
      error => {
        console.log("Error");
        console.log(error);
      }
    );
    }
  }
}

/*
      this.userService.getUsuarios().subscribe(
        (usuario:any)  =>
        {
          console.log("Correcto");
          console.log(usuario);

        },
        error => {
          console.log("Error");
          console.log(error);
        }
      ); */