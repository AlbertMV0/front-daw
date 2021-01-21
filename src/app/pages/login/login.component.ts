import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private form_builder: FormBuilder,private http: HttpClient) { }

ngOnInit(){
  //inicializamos la variable form
 this.loginForm= this.form_builder.group({
email:[null,[Validators.email, Validators.required]],//[null,Validators.compose([Validators.email,Validators.required])]
password:[null,Validators.required]

  });
}
public enviar():void{
  
  console.log(this.loginForm.getRawValue());
  this.http.get('http://localhost:8000/api/usuarios').subscribe(
      result=>{console.log("Correcto")
      console.log(result);

  },
     error => {console.log("Error");
     console.log(error);
     }
  );
}
}
