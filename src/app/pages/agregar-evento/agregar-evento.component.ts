import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgregarService } from 'src/app/service/agregar.service';

@Component({
  selector: 'app-agregar-evento',
  templateUrl: './agregar-evento.component.html',
  styleUrls: ['./agregar-evento.component.scss']
})
export class AgregarEventoComponent {
  eventoForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private agregarService: AgregarService) {
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
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
    if (this.eventoForm.valid) {
      const nombre = this.eventoForm.get('nombre')?.value;
      const descripcion = this.eventoForm.get('descripcion')?.value;
      const fechaInicio = this.eventoForm.get('fechaInicio')?.value;
      const fechaFin = this.eventoForm.get('fechaFin')?.value;
      const latitud = this.eventoForm.get('latitud')?.value;
      const longitud = this.eventoForm.get('longitud')?.value;
      const foto = "Upload-6518a96cabc38-01102023.jpeg";
      //19.817530499913865, -97.36088774178596
      //Upload-6518a96cabc38-01102023.jpeg

      this.agregarService.registrarEvento(nombre, descripcion, fechaInicio, fechaFin, latitud, longitud, foto).subscribe({
        next: () => {
          this.router.navigate(['/eventos']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      console.log('Complete el formulario');
    }
  }
}