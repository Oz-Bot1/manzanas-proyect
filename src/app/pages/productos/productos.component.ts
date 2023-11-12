import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NotasService } from 'src/app/service/notas.service';
import { ProductosService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  lista: any[] = [];
  idRol: string = this.cookie.get('idRol');
  idUser: string = this.cookie.get('idUser');
  banderaId: boolean = false;
  formulario: FormGroup;
  listaIdManzana: any[] = [];
  listaMensaje: any[] = [];

  banderaRol() {
    if (this.idRol == "2") {
      this.banderaId = true;
    } else {
      this.banderaId = false;
    }
  }

  constructor(private productos: ProductosService, private router: Router,private homeService: NotasService, private cookie: CookieService, private fb: FormBuilder) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Mueve la página al inicio
      }
    });
    this.productosAgrupados = {};
    this.formulario = this.fb.group({
      tipoManzana: ['1', Validators.required],
      tipoMensaje: ['1', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]], // Valor predeterminado: 1
    });
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
    this.banderaRol();

    if (this.banderaId == true) {
      this.homeService.listaManzanas().subscribe({
        next: (data) => {
          this.listaIdManzana = data.data;
        },
        error: (error) => {
          console.log(error);
        }
      });

      this.homeService.listaTipoNotas().subscribe({
        next: (data) => {
          this.listaMensaje = data.data;
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
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

  onSubmit() {
    if (this.formulario.valid) {
      const formData = this.formulario.value;
      const cantidad = formData.cantidad;
      const tipoManzana = formData.tipoManzana;
      const tipoMensaje = formData.tipoMensaje;
      const idUser = this.idUser;
      this.homeService.crear(tipoManzana, tipoMensaje, cantidad, idUser).subscribe({
        next: () => {
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
}
