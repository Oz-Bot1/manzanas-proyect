import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgregarService } from 'src/app/service/agregar.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-agregar-actividad',
  templateUrl: './agregar-actividad.component.html',
  styleUrls: ['./agregar-actividad.component.scss']
})
export class AgregarActividadComponent {
  actividadForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private agregarService: AgregarService) {
    this.actividadForm = this.fb.group({
      nombre: ['', Validators.required],
      foto: [''],
      descripcion: ['', Validators.required],
    });
  }

  obj: any = {};
  nombrefoto: string = '';
  onFileSelect(input: any) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.obj.photoUrl = e.target.result;
        this.agregarService.saveImage(this.obj.photoUrl).subscribe({
          next: (data) => {
            this.nombrefoto = data.fileName.nombre;
            console.log(this.nombrefoto);
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
  onSubmit() {
    if (this.actividadForm.valid) {
      const nombre = this.actividadForm.get('nombre')?.value;
      const descripcion = this.actividadForm.get('descripcion')?.value;
      const fotoControl = this.nombrefoto;

      this.agregarService.registrarActividad(nombre, descripcion, fotoControl).subscribe({
        next: () => {
          this.router.navigate(['/actividadesAdmin']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      console.log('Complete el formulario');
    }
  }

  liberar() {
    this.router.navigate(['/liberar']);
  }
}
