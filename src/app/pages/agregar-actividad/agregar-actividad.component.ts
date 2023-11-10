import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActividadesService } from 'src/app/service/actividades.service';
import { AgregarService } from 'src/app/service/agregar.service';

@Component({
  selector: 'app-agregar-actividad',
  templateUrl: './agregar-actividad.component.html',
  styleUrls: ['./agregar-actividad.component.scss']
})
export class AgregarActividadComponent implements OnInit, OnDestroy {
  titulo: string = 'Agregar Actividad';
  tituloBoton: string = 'Agregar Actividad';
  //id para actualizar
  id = localStorage.getItem('idAct');
  //Variables de la foto
  obj: any = {};
  nombrefoto: string = '';
  actividadForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private agregarService: AgregarService, private actividadesService: ActividadesService) {
    this.actividadForm = this.fb.group({
      nombre: ['', Validators.required],
      foto: [''],
      descripcion: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }

  ngOnInit(): void {
    if (this.id !== null) {
      const idAsNumber = parseInt(this.id, 10);
      if (!isNaN(idAsNumber)) {
        this.titulo = "Actualizar Actividad";
        this.tituloBoton = 'Actualizar Actividad'
        this.buscar(idAsNumber);
      } else {
        this.router.navigate(['/eventos']);
      }
    }
  }

  buscar(id: number) {
    this.actividadesService.buscar(id).subscribe(
      {
        next: (data) => {
          const actividad = data.data[0];
          this.nombrefoto = actividad.foto;
          this.actividadForm.patchValue({
            nombre: actividad.nombre,
            descripcion: actividad.descripcion
          });
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

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

  obtenerNombreImagen(nombre: string): string {
    if (nombre.endsWith('.jpeg')) {
      return nombre.slice(0, -5); // Elimina los últimos 5 caracteres (".jpeg")
    }
    return nombre;
  }

  onSubmit() {
    if (this.actividadForm.valid) {
      const nombre = this.actividadForm.get('nombre')?.value;
      const descripcion = this.actividadForm.get('descripcion')?.value;
      const fotoControl = this.nombrefoto;

      if (this.id !== null) {
        const idAsNumber = parseInt(this.id, 10);
        if (!isNaN(idAsNumber)) {
          this.actividadesService.actualizar(idAsNumber, nombre, descripcion, fotoControl).subscribe({
            next: () => {
              this.router.navigate(['/admin/actividadesAdmin']);
            },
            error: (error) => {
              console.log(error);
            }
          });
        } else {
          this.router.navigate(['/admin/eventos']);
        }
      } else {
        this.agregarService.registrarActividad(nombre, descripcion, fotoControl).subscribe({
          next: () => {
            this.router.navigate(['/admin/actividadesAdmin']);
          },
          error: (error) => {
            console.log(error);
          }
        });
      }

    } else {
      console.log('Complete el formulario');
    }
  }
}
