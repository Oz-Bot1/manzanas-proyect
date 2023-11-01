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

  constructor(private fb: FormBuilder,private actividadesService: ActividadesService, private agregarService: AgregarService, private router: Router){
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

  buscar(id: number, rol: number, nombre: string) {
    if (rol === 1) {
      localStorage.setItem('idAct', id.toString());
      this.router.navigate(['/agregarActividad']);
    } else {
      this.idAct = id;
      this.nombreProducto = nombre;
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
