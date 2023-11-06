import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ProductosService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  lista: any[] = [];

  constructor(private productos: ProductosService, private router: Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Mueve la página al inicio
      }
    });
    this.productosAgrupados = {};
  }

  obtenerNombreImagen(nombre: string): string {
    if (nombre.endsWith('.jpeg')) {
      return nombre.slice(0, -5); // Elimina los últimos 5 caracteres (".jpeg")
    }
    return nombre;
  }

  productosAgrupados: { [key: string]: any[] };
  categorias = {};
  ngOnInit(): void {
    this.productos.lista().subscribe({
      next: (data) => {
        this.lista = data.data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
         // Crear un objeto para agrupar los productos por categoría
         const productosAgrupados: { [key: string]: any[] } = {};
  
         // Recorrer la lista de productos y agruparlos por categoría
         this.lista.forEach((producto) => {
           const categoria = producto.categoria_nombre;
   
           if (!productosAgrupados[categoria]) {
             productosAgrupados[categoria] = [];
           }
   
           productosAgrupados[categoria].push(producto);
         });
   
         // Guardar el objeto de productos agrupados en una variable
         this.productosAgrupados = productosAgrupados;
   
         console.log(this.productosAgrupados);
      }
    });
  }
  

}
