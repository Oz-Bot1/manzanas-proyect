import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  mensajeError: string = "";

  constructor(private router: Router, private formBuilder: FormBuilder, private loginService: LoginService) {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });
  }

  inventario() {
    this.router.navigate(['/inventario']);
  }

  crearUsuario() {
    this.router.navigate(['/crearUsuario']);
  }

  onLogin() {
    if (this.loginForm.valid) {
      setTimeout(() => {
        const usuario = this.loginForm.get('usuario')?.value;
        const contrasenia = this.loginForm.get('contrasenia')?.value;

        this.loginService.Login(usuario, contrasenia).subscribe({
          next: (response) => {
            if (response.data[0].token) {
              const token = response.data[0].token;
              this.loginService.flagChange(true);
              console.log(response);
              if (response.data[0].idRol == 1) {
                this.router.navigate(['/inventario']);
                sessionStorage.setItem('tokencito', token);
                console.log(token);
              } else {
                this.router.navigate(['/home']);
                sessionStorage.setItem('tokencito', token);
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
      }, 100); // Espera de 100 mls
    } else {
      this.mensajeError = 'Por favor, complete todos los campos';
    }
  }

  getMensajeError(): string {
    return this.mensajeError;
  }
}
