import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgregarService } from 'src/app/service/agregar.service';
import { InventarioService } from 'src/app/service/inventario.service';
import Swiper, { Navigation, Pagination } from 'swiper';

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
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
      },
      autoplay: {
        delay: 3000,
      },
    });
    this.inventarioService.lista().subscribe(
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
    this.inventarioService.listaDerivados().subscribe(
      {
        next: (data) => {
          this.listaDerivados = data.data;
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
