import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ProductosService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  lista: any[] = [];
  idRol = this.cookie.get('idRol');
  banderaBtn: boolean = false;

  constructor(private productos: ProductosService, private cookie: CookieService){}
  imagen: any = {};

  obtenerNombreImagen(nombre: string): string {
    if (nombre.endsWith('.jpeg')) {
      return nombre.slice(0, -5); // Elimina los últimos 5 caracteres (".jpeg")
    }
    return nombre;
  }

  ngOnInit(): void {
    if(this.idRol === '3'){
      this.banderaBtn = true;
    }else{
      this.banderaBtn = false;
    }
    console.log(this.banderaBtn)
    this.productos.lista().subscribe(
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

  comprar() {
    const id = this.idRol;
    this.productos.carrito(id).subscribe(
      {
        next: () => {
          console.log('bien');
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
        }
      }
    );
  }

}
