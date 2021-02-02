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
  mensajeError: string;
  error: boolean;
  constructor(private form_builder: FormBuilder, private http: HttpClient, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.form_builder.group({
      email: [null, [Validators.email, Validators.required]],//[null,Validators.compose([Validators.email,Validators.required])]
      password: [null, Validators.required]

    });
  }
  public enviar(): void {
    const formData = this.loginForm.getRawValue();
    const data = { email: formData.email, password: formData.password };

    if (this.loginForm.valid) {
      this.userService.login(data).subscribe(
        (usuario: any) => {
          this.router.navigate(['']);
        },
        error => {
          console.log(error);
          this.mensajeError = 'Tiene que introducir unos datos válidos';
          this.error = true;
        }
      );
    }
  }
}

