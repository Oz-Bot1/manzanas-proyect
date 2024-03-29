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
        if (data && data.data && data.data.length > 0) {
          this.listaPuntos = data.data;
        } else {
          this.listaPuntos = [];
        }
      },
      error: (error) => {
        this.listaEventos = [];
        console.error(error);
      }
    });

    this.eventosService.listaEventos().subscribe({
      next: (data) => {
        if (data && data.data && data.data.length > 0) {
          this.listaEventos = data.data;
        } else {
          this.listaEventos = [];
        }
      },
      error: (error) => {
        this.listaEventos = [];
        console.error(error);
      }
    });
    
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
      this.router.navigate(['/admin/agregarPunto']);
    } else {
      this.idAct = id;
      this.nombreProducto = nombre;
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
      this.router.navigate(['/admin/agregarEvento']);
    } else {
      this.idAct = id;
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
