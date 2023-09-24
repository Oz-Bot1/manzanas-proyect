import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearUsuarioService } from 'src/app/service/crear-usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private crearUsuarioService: CrearUsuarioService) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      apePat: ['', Validators.required],
      apeMat: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const usuario = this.registrationForm.get('username')?.value;
      const contrasenia = this.registrationForm.get('password')?.value;
      const nombre = this.registrationForm.get('firstName')?.value;
      const apellidoPat = this.registrationForm.get('apePat')?.value;
      const apellidoMat = this.registrationForm.get('apeMat')?.value;
      const correo = this.registrationForm.get('email')?.value;
      const telefono = this.registrationForm.get('phone')?.value;
  
      this.crearUsuarioService.registrarUser(usuario, nombre, contrasenia, apellidoPat, apellidoMat, correo, telefono).subscribe(
        {
          next: () => {
            console.log("Bien");
          },
          error: (error) => {
            console.log(error);
          }
        }
      )
    } else {
      console.log("El formulario es inválido");
    }
  }
  
  mensajeError = "";

  getMensajeError(): string {
    return this.mensajeError;
  }

  ngOnInit(): void {
    
  }

}
