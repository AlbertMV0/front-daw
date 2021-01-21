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
    console.log(this.loginForm.getRawValue());
    if (this.loginForm.valid) {
    
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
      );
    }
  }
}
