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

  constructor(private productos: ProductosService, private router: Router) {
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
  listaRojas: any[] = [];
  listaAmarillas: any[] = [];
  listaVerdes: any[] = [];
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
        const productosAgrupados: { [key: string]: any[] } = {
          roja: [],
          amarilla: [],
          verde: [],
        };

        // Recorrer la lista de productos y agruparlos por categoría
        this.lista.forEach((producto) => {
          const categoria = producto.categoria_nombre;

          if (productosAgrupados[categoria]) {
            productosAgrupados[categoria].push(producto);
          }
        });

        // Asignar las listas a las variables de clase
        this.listaRojas = productosAgrupados['roja'];
        this.listaAmarillas = productosAgrupados['amarilla'];
        this.listaVerdes = productosAgrupados['verde'];
      }
    });
  }

  cambiarCategoria(categoria: string) {
    const rojas = document.getElementById("rojas");
    const verdes = document.getElementById("verdes");
    const amarillas = document.getElementById("amarillas");
    const btnRoja = document.getElementById("btnRoja");
    const btnVerde = document.getElementById("btnVerde");
    const btnAmarilla = document.getElementById("btnAmarilla");

    rojas?.classList.remove("ocultar", "mostrar");
    verdes?.classList.remove("ocultar", "mostrar");
    amarillas?.classList.remove("ocultar", "mostrar");
    btnRoja?.classList.remove("active_categoria");
    btnVerde?.classList.remove("active_categoria");
    btnAmarilla?.classList.remove("active_categoria");
    
    if(categoria === 'roja'){
      verdes?.classList.add('ocultar');
      amarillas?.classList.add('ocultar');
      rojas?.classList.add('mostrar');
      btnRoja?.classList.add('active_categoria');
    }

    if(categoria === 'verde'){
      rojas?.classList.add('ocultar');
      amarillas?.classList.add('ocultar');
      verdes?.classList.add('mostrar');
      btnVerde?.classList.add('active_categoria');
    }

    if(categoria === 'amarilla'){
      rojas?.classList.add('ocultar');
      verdes?.classList.add('ocultar');
      amarillas?.classList.add('mostrar');
      btnAmarilla?.classList.add('active_categoria');
    }
      
  }
}
