import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventosService } from 'src/app/service/eventos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  listaPuntos: any[] = [];
  puntoVentaForm: FormGroup;
  latitud: number = 0;
  longitud: number = 0;
  listaEventos: any[] = [];
  idAct: number = 0;
  nombreProducto: string = '';

  constructor(private fb: FormBuilder, private eventosService: EventosService, private router: Router) {
    this.puntoVentaForm = this.fb.group({
      nombre: ['', Validators.required],
      estatus: ['1'], // Valor por defecto 'Activo'
      horario: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.eventosService.listaPuntos().subscribe({
      next: (data) => {
        this.listaPuntos = data.data;
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.eventosService.listaEventos().subscribe({
      next: (data) => {
        this.listaEventos = data.data;
      }
    })
  }

  obtenerNombreImagen(nombre: string): string {
    if (nombre.endsWith('.jpeg')) {
      return nombre.slice(0, -5); // Elimina los últimos 5 caracteres (".jpeg")
    }
    return nombre;
  }

  buscarPunto(id: number, rol: number, nombre: string) {
    if (rol === 1) {
      localStorage.setItem('idAct', id.toString());
      this.router.navigate(['/agregarPunto']);
    } else {
      this.nombreProducto = nombre;
    }
  }

  actualizarPunto() {
    if (this.puntoVentaForm.valid) {
      const id = this.idAct;
      const nombre = this.puntoVentaForm.get('nombre')?.value;
      const fotoControl = '';
      const latitud = this.latitud.toString();
      const longitud = this.longitud.toString();
      const estatus = this.puntoVentaForm.get('estatus')?.value;
      const horario = this.puntoVentaForm.get('horario')?.value;

      this.eventosService.actualizarPunto(id, nombre, fotoControl, latitud, longitud, estatus, horario).subscribe({
        next: () => {
          location.reload();
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      console.log('Complete el formulario');
    }
  }

  eliminarPunto() {
    const id = this.idAct;
    this.eventosService.eliminarPunto(id).subscribe({
      next: () => {
        location.reload();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  buscarEvento(id: number, rol: number, nombre: string) {
    if (rol === 1) {
      localStorage.setItem('idAct', id.toString());
      this.router.navigate(['/agregarEvento']);
    } else {
      this.nombreProducto = nombre;
    }
  }

  eliminarEvento() {
    const id = this.idAct;
    this.eventosService.eliminarEvento(id).subscribe({
      next: () => {
        location.reload();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
