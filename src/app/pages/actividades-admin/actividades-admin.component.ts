import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActividadesService } from 'src/app/service/actividades.service';
import { AgregarService } from 'src/app/service/agregar.service';

@Component({
  selector: 'app-actividades-admin',
  templateUrl: './actividades-admin.component.html',
  styleUrls: ['./actividades-admin.component.scss']
})
export class ActividadesAdminComponent implements OnInit {
  lista: any[] = [];
  actividadForm: FormGroup;

  constructor(private fb: FormBuilder,private actividadesService: ActividadesService, private agregarService: AgregarService){
    this.actividadForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  obtenerNombreImagen(nombre: string): string {
    if (nombre.endsWith('.jpeg')) {
      return nombre.slice(0, -5); // Elimina los últimos 5 caracteres (".jpeg")
    }
    return nombre;
  }

  ngOnInit(): void {
    this.actividadesService.lista().subscribe(
      {
        next: (data) => {
          this.lista = data.data;
          console.log(this.lista);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
        }
      }
    );
  }
  
  idAct: number = 0;
  nombreProducto: string = '';

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

  buscar(id: number) {
    this.actividadesService.buscar(id).subscribe(
      {
        next: (data) => {
          this.idAct = data.data[0].id;
          this.nombreProducto = data.data[0].nombre;
          const actividad = data.data[0];
          this.nombrefoto = actividad.foto;
          this.actividadForm.patchValue({
            nombre: actividad.nombre,
            descripcion: actividad.descripcion,
            foto: actividad.foto,
          });
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  onSubmit() {
    if (this.actividadForm.valid) {
      const id = this.idAct.toString();
      const nombre = this.actividadForm.get('nombre')?.value;
      const descripcion = this.actividadForm.get('descripcion')?.value;
      const fotoControl = this.nombrefoto;

      this.actividadesService.actualizar(id, nombre, descripcion, fotoControl).subscribe({
        next: () => {
          location.reload();
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      console.log('Complete el formulario');
    }
  }

  eliminar() {
    const id = this.idAct;
    this.actividadesService.eliminar(id).subscribe({
      next: () => {
        location.reload();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
