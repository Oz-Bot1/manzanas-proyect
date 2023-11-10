import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  mensajeError: string = "";

  constructor(private router: Router, private formBuilder: FormBuilder, private loginService: LoginService) {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  }

  onLogin() {
    if (this.loginForm.valid) {
        const usuario = this.loginForm.get('usuario')?.value;
        const contrasenia = this.loginForm.get('contrasenia')?.value;

        this.loginService.Login(usuario, contrasenia).subscribe({
          next: (response) => {
            if (response.data.token) {
              const token = response.data.token;
              this.loginService.flagChange(true);
              if (response.data.idRol == 1) {
                this.router.navigate(['/admin/ventas']);
                console.log(token);
              } else {
                this.router.navigate(['/home']);
                console.log(token);
              }
            } else {
              this.mensajeError = 'Usuario o contraseña incorrectas';
            }
          },
          error: (error) => {
            console.error(error);
          }
        });
    } else {
      this.mensajeError = 'Por favor, complete todos los campos';
    }
  }

  getMensajeError(): string {
    return this.mensajeError;
  }
}
