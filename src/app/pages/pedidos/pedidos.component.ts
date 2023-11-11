import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { PedidosService } from 'src/app/service/pedidos.service';
import { ProductosService } from 'src/app/service/productos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import Swiper, { Pagination, Navigation } from 'swiper';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  latitud: number = 19.776097222715837;
  longitud: number = -97.38592150346066;
  lista: any[] = [];
  listaProductos: any[] = [];
  listaProductosCompleta: any[] = [];
  banderaContacto: boolean = false;
  mapa: L.Map | undefined;
  productForm: FormGroup;

  constructor(private pedidosService: PedidosService, private productosService: ProductosService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
    });
  }

  banderaMapa: boolean = false;

  ngOnInit(): void {
    this.pedidosService.listaPuntos().subscribe({
      next: (data) => {
        this.lista = data.data;
        this.inicializarMapa();
        this.agregarMarcadores(this.lista);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.banderaMapa = true;
        this.cambiarMapa();
      }
    });

    this.productosService.lista().subscribe({
      next: (data) => {
        this.listaProductos = data.data;
        this.listaProductosCompleta = data.data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.listaProductos = this.listaProductos.filter((producto) => producto.estatus === 1);
      }
    });

    const swiper = new Swiper('.mySwiper', {
      modules: [Pagination, Navigation],
      loop: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        
      },
      spaceBetween: 16,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
      }
    });
  }

  inicializarMapa() {
    const map = L.map('map').setView([this.latitud, this.longitud], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    this.mapa = map;
  }

  agregarMarcadores(lista: any[]) {
    const customIcon = L.icon({
      iconUrl: '../../../assets/img/marcador.png',
      iconSize: [50, 50], // Tamaño del icono [ancho, alto]
      iconAnchor: [16, 32], // Punto de anclaje del icono [horizontal, vertical]
    });

    lista.forEach((item) => {
      const marker = L.marker([item.latitud, item.longitud], { icon: customIcon })
        .bindPopup(item.nombre)
        .addTo(this.mapa!);
    });
  }

  obtenerNombreImagen(nombre: string): string {
    if (nombre.endsWith('.jpeg')) {
      return nombre.slice(0, -5); // Elimina los últimos 5 caracteres (".jpeg")
    }
    return nombre;
  }

  productosSeleccionados: any[] = [];

  onProductSelected(product: any,) {
    product.selected = !product.selected;
    if (!product.selected) {
      // Si el producto se ha deseleccionado, elimínalo de la lista productosSeleccionados
      const sub = product.cantidad * product.precioTonelada;
      this.total -= sub;
      this.productosSeleccionados = this.productosSeleccionados.filter(
        (p) => p.idManzana !== product.id
      );
    } else {
      if (!product.cantidad) {
        product.cantidad = 1;
      }
      this.onCantidadBlur(product);
    }
    this.actualizarBanderaContacto();
  }

  actualizarBanderaContacto() {
    this.banderaContacto = this.listaProductos.some(product => product.selected);
  }

  total: number = 0;

  onCantidadBlur(product: any) {
    const nuevaCantidad = product.cantidad;
    const nuevoSubtotal = product.precioTonelada * nuevaCantidad;

    const productoExistente = this.productosSeleccionados.find((p) => p.idManzana === product.id);
    if (nuevaCantidad > 0) {
      if (productoExistente) {
        // Restar el subtotal anterior del producto al total
        this.total -= productoExistente.subtotal;

        // Actualizar la cantidad y el subtotal del producto
        productoExistente.cantidad = nuevaCantidad;
        productoExistente.subtotal = nuevoSubtotal;
      } else {
        // Si el producto no está en la lista, agrégalo
        const productoSimplificado: any = {
          idManzana: product.id,
          foto: product.foto,
          cantidad: nuevaCantidad,
          nombre: product.nombre,
          precio: product.precioTonelada,
          subtotal: nuevoSubtotal
        };
        this.productosSeleccionados.push(productoSimplificado);
      }

      // Sumar el nuevo subtotal al total
      this.total += nuevoSubtotal;
    } else if (productoExistente) {
      // Si la cantidad es 0 y el producto existe en la lista, eliminarlo y restar su subtotal del total
      this.productosSeleccionados = this.productosSeleccionados.filter(
        (p) => p.idManzana !== product.id
      );
      this.total -= productoExistente.subtotal;
    } else {

    }
  }



  submitForm() {
    const formData = this.productForm.value;
    const nombre = formData.nombre;
    const estado = formData.estado;
    const ciudad = formData.ciudad;
    const correo = formData.email;
    const telefono = formData.telefono;

    if (this.productForm.valid) {
      this.pedidosService.pedido(nombre, estado, ciudad, correo, telefono, this.productosSeleccionados).subscribe({
        next: () => {
          Swal.fire({
            title: '¡Bien!',
            text: 'Excelente',
            icon: 'warning',
            confirmButtonColor: '#4E9545'
          });
          this.ngOnInit();
        },
        error: (error) => {
          console.log(error);
        }
      });
    }else{
      Swal.fire({
        title: 'Porfavor',
        text: 'Complete lo campos',
        icon: 'error',
        confirmButtonColor: '#4E9545'
      });
    }
  }

  cambiarMapa() {
    this.banderaMapa = !this.banderaMapa;
    const id = document.getElementById('banderaMapa');
    const mayoreo = document.getElementById('mayoreo');
    const menudeo = document.getElementById('menudeo');
    id?.classList.remove('ocultar', 'mostrar');
    mayoreo?.classList.remove('ocultar', 'mostrar');
    menudeo?.classList.remove('ocultar', 'mostrar');
    if (this.banderaMapa == true) {
      id?.classList.add('mostrar');
      menudeo?.classList.add('mostrar');
      mayoreo?.classList.add('ocultar');
    } else {
      id?.classList.add('ocultar');
      menudeo?.classList.add('ocultar');
      mayoreo?.classList.add('mostrar');
    }
  }
}