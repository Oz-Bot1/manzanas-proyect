import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgregarService } from 'src/app/service/agregar.service';
import { InventarioService } from 'src/app/service/inventario.service';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

Swiper.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {
  lista: any[] = [];

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
  }

  idAct: number = 0;
  nombreProducto: string = '';
  buscar(id: number, rol: number, nombre: string) {
    if (rol === 1) {
      localStorage.setItem('idAct', id.toString());
      this.router.navigate(['/agregar']);
    } else {
      this.nombreProducto = nombre;
    }
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

}
