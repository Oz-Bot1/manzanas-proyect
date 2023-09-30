import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-agregar-actividad',
  templateUrl: './agregar-actividad.component.html',
  styleUrls: ['./agregar-actividad.component.scss']
})
export class AgregarActividadComponent {
  actividadForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // Define tu formulario reactivo con los campos necesarios y las validaciones
    this.actividadForm = this.fb.group({
      nombre: ['', Validators.required],
      foto: [''],
      descripcion: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.actividadForm.value);
  }
  
  liberar() {
    this.router.navigate(['/liberar']);
  }
}
