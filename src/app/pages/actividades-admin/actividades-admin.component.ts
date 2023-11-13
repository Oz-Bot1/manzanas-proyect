import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadesService } from 'src/app/service/actividades.service';

@Component({
  selector: 'app-actividades-admin',
  templateUrl: './actividades-admin.component.html',
  styleUrls: ['./actividades-admin.component.scss']
})
export class ActividadesAdminComponent implements OnInit {
  lista: any[] = [];

  constructor(private actividadesService: ActividadesService, private router: Router){}

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
      this.router.navigate(['/admin/agregarActividad']);
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
