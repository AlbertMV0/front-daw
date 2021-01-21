import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(/*private fb: FormBuilder*/) { }
  ngOnInit(): void {
  }
/*ngOnInit(){
  //inicializamos la variable form
 this.form= this.fb.group({
email:'',
password:''

  });
}*/

}
