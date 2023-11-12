import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgregarService } from 'src/app/service/agregar.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agregar-productor',
  templateUrl: './agregar-productor.component.html',
  styleUrls: ['./agregar-productor.component.scss']
})
export class AgregarProductorComponent {
  productorForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private agregarService: AgregarService) {
    this.productorForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.pattern('[0-9]*')],
      usuario: ['', Validators.required],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.productorForm.valid) {
      const usuario = this.productorForm.get('usuario')?.value;
      const contrasenia = this.productorForm.get('contrasenia')?.value;
      const nombre = this.productorForm.get('nombre')?.value;
      const apellidoPat = this.productorForm.get('apellidoPaterno')?.value;
      const apellidoMat = this.productorForm.get('apellidoMaterno')?.value;
      const correo = this.productorForm.get('correo')?.value;
      const telefono = this.productorForm.get('telefono')?.value;

      this.agregarService.registrarProductor(usuario, nombre, contrasenia, apellidoPat, apellidoMat, correo, telefono).subscribe(
        {
          next: () => {
            this.router.navigate(['/admin/ventas']);
          },
          error: (error) => {
            console.log(error);
          }
        }
      )
    } else {
      Swal.fire({
        title: 'Porfavor',
        text: 'Complete lo campos',
        icon: 'error',
        confirmButtonColor: '#4E9545'
      });
    }
  }
}
