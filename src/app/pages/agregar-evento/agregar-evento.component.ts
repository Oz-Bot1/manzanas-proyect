import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgregarService } from 'src/app/service/agregar.service';
import * as L from 'leaflet';
import { EventosService } from 'src/app/service/eventos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-evento',
  templateUrl: './agregar-evento.component.html',
  styleUrls: ['./agregar-evento.component.scss']
})
export class AgregarEventoComponent implements OnInit, OnDestroy {
  titulo: string = 'Agregar Evento';
  tituloBoton: string = 'Agregar Evento';
  eventoForm: FormGroup;
  //mapa
  latitud: number = 19.7760972227;
  longitud: number = -97.385921503;
  //id para actualizar
  id = localStorage.getItem('idAct');
  //Variables de la foto
  obj: any = {};
  nombrefoto: string = '';

  constructor(private fb: FormBuilder, private router: Router, private agregarService: AgregarService, private eventosService: EventosService) {
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.id !== null) {
      const idAsNumber = parseInt(this.id, 10);
      if (!isNaN(idAsNumber)) {
        this.titulo = "Actualizar Evento";
        this.tituloBoton = 'Actualizar Evento'
        this.buscarEvento(idAsNumber);
      } else {
        this.router.navigate(['/admin/eventos']);
      }
    } else {
      this.generarMapa(this.latitud, this.longitud);
    }
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }

  buscarEvento(id: number) {
    this.eventosService.buscarEvento(id).subscribe(
      {
        next: (data) => {
          const actividad = data.data[0];
          this.nombrefoto = actividad.foto;
          this.eventoForm.patchValue({
            nombre: actividad.nombre,
            foto: actividad.foto,
            descripcion: actividad.descripcion,
            fechaInicio: actividad.fechaInicio,
            fechaFin: actividad.fechaFin
          });
          this.latitud = this.eliminarUltimosDigitos(actividad.latitud, 5);
          this.longitud = this.eliminarUltimosDigitos(actividad.longitud, 5);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.generarMapa(this.latitud, this.longitud);
        }
      }
    );
  }

  obtenerNombreImagen(nombre: string): string {
    if (nombre.endsWith('.jpeg')) {
      return nombre.slice(0, -5); // Elimina los últimos 5 caracteres (".jpeg")
    }
    return nombre;
  }

  generarMapa(latitud: number, longitud: number) {
    const map = L.map('map').setView([latitud, longitud], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Crear un icono personalizado
    const customIcon = L.icon({
      iconUrl: '../../../assets/img/marcador.png',
      iconSize: [50, 50], // Tamaño del icono [ancho, alto]
      iconAnchor: [16, 32], // Punto de anclaje del icono [horizontal, vertical]
    });

    const marker = L.marker([latitud, longitud], { icon: customIcon })
      .bindPopup('¡Aqui!')
      .openPopup();

    marker.addTo(map);

    // Configurar evento de clic en el mapa
    map.on('click', (e) => {
      // Obtener las coordenadas donde se hizo clic
      const latLng = e.latlng;

      // Mover el marcador a las coordenadas donde se hizo clic
      marker.setLatLng(latLng);

      this.latitud = this.eliminarUltimosDigitos(latLng.lat, 5);
      this.longitud = this.eliminarUltimosDigitos(latLng.lng, 5);
    });
  }

  eliminarUltimosDigitos(coordenada: number, cantidadDigitos: number): number {
    const factor = Math.pow(10, cantidadDigitos);
    return Math.floor(coordenada * factor) / factor;
  }

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

  onSubmit() {
    if (this.eventoForm.valid) {
      const nombre = this.eventoForm.get('nombre')?.value;
      const descripcion = this.eventoForm.get('descripcion')?.value;
      const fechaInicio = this.eventoForm.get('fechaInicio')?.value;
      const fechaFin = this.eventoForm.get('fechaFin')?.value;
      const latitud = this.latitud.toString();
      const longitud = this.longitud.toString();
      const foto = this.nombrefoto;

      if (foto !== '') {
        if (this.id !== null) {
          const idAsNumber = parseInt(this.id, 10);
          if (!isNaN(idAsNumber)) {
            this.eventosService.actualizarEvento(idAsNumber, nombre, foto, latitud, longitud, descripcion, fechaInicio, fechaFin).subscribe({
              next: () => {
                this.router.navigate(['/admin/eventos']);
              },
              error: (error) => {
                console.log(error);
              }
            });
          } else {
            this.router.navigate(['/admin/eventos']);
          }
        } else {
          this.agregarService.registrarEvento(nombre, descripcion, fechaInicio, fechaFin, latitud, longitud, foto).subscribe({
            next: () => {
              this.router.navigate(['/admin/eventos']);
            },
            error: (error) => {
              console.log(error);
            }
          });
        }
      } else {
        this.errorSwal();
      }
    } else {
      this.errorSwal();
    }
  }

  errorSwal() {
    Swal.fire({
      title: 'Porfavor',
      text: 'Complete lo campos',
      icon: 'error',
      confirmButtonColor: '#4E9545'
    });
  }
}