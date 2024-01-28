import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgregarService } from 'src/app/service/agregar.service';
import { InventarioService } from 'src/app/service/inventario.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {
  lista: any[] = [];
  listaDerivados: any[] = [];

  constructor(private inventarioService: InventarioService, private agregarService: AgregarService, private router: Router) {
  }

  ngOnInit(): void {
    this.inventarioService.lista().subscribe({
      next: (data) => {
        if (data && data.data && data.data.length > 0) {
          this.lista = data.data;
        } else {
          this.lista = [];
        }
      },
      error: (error) => {
        this.lista = [];
        console.error(error);
      }
    });

    this.inventarioService.listaDerivados().subscribe({
      next: (data) => {
        if (data && data.data && data.data.length > 0) {
          this.listaDerivados = data.data;
        } else {
          this.listaDerivados = [];
        }
      },
      error: (error) => {
        this.listaDerivados = [];
        console.error(error);
      }
    });
  }

  idAct: number = 0;
  nombreProducto: string = '';
  buscar(id: number, rol: number, nombre: string) {
    if (rol === 1) {
      localStorage.setItem('idAct', id.toString());
      this.router.navigate(['/admin/agregar']);
    } else {
      this.idAct = id;
      this.nombreProducto = nombre;
    }
  }

  buscarDerivado(id: number, rol: number, nombre: string) {
    if (rol === 1) {
      localStorage.setItem('idAct', id.toString());
      this.router.navigate(['/admin/agregarDerivado']);
    } else {
      this.idAct = id;
      this.nombreProducto = nombre;
    }
  }

  obtenerNombreImagen(nombre: string): string {
    if (nombre.endsWith('.jpeg')) {
      return nombre.slice(0, -5); // Elimina los últimos 5 caracteres (".jpeg")
    }
    return nombre;
  }

  eliminar() {
    const id = this.idAct;
    this.inventarioService.eliminar(id).subscribe({
      next: () => {
        location.reload();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  eliminarDerivado() {
    const id = this.idAct;
    this.inventarioService.eliminarDerivado(id).subscribe({
      next: () => {
        location.reload();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
