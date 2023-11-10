import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgregarService } from 'src/app/service/agregar.service';
import * as L from 'leaflet';
import { EventosService } from 'src/app/service/eventos.service';

@Component({
  selector: 'app-agregar-punto',
  templateUrl: './agregar-punto.component.html',
  styleUrls: ['./agregar-punto.component.scss']
})
export class AgregarPuntoComponent implements OnInit, OnDestroy {
  titulo: string = 'Agregar Punto de Venta';
  tituloBoton: string = 'Agregar Punto de Venta';
  puntoVentaForm: FormGroup;
  latitud: number = 19.7760972227;
  longitud: number = -97.385921503;
  //id para actualizar
  id = localStorage.getItem('idAct');
  //Variables de la foto
  obj: any = {};
  nombrefoto: string = '';

  constructor(private fb: FormBuilder, private agregarService: AgregarService, private router: Router, private eventosService: EventosService) {
    this.puntoVentaForm = this.fb.group({
      nombre: ['', Validators.required],
      estatus: ['1'], // Valor por defecto 'Activo'
      horario: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }

  ngOnInit(): void {
    if (this.id !== null) {
      const idAsNumber = parseInt(this.id, 10);
      if (!isNaN(idAsNumber)) {
        this.titulo = "Actualizar Punto de Venta";
        this.tituloBoton = 'Actualizar Punto de Venta';
        this.buscarPunto(idAsNumber);
      } else {
        this.router.navigate(['/admin/eventos']);
      }
    } else {
      this.generarMapa(this.latitud, this.longitud);
    }
  }

  buscarPunto(id: number) {
    this.eventosService.buscarPunto(id).subscribe(
      {
        next: (data) => {
          const actividad = data.data[0];
          this.nombrefoto = actividad.foto;
          this.puntoVentaForm.patchValue({
            nombre: actividad.nombre,
            horario: actividad.horario,
            estatus: actividad.estatus
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

  eliminarUltimosDigitos(coordenada: number, cantidadDigitos: number): number {
    const factor = Math.pow(10, cantidadDigitos);
    return Math.floor(coordenada * factor) / factor;
  }

  obtenerNombreImagen(nombre: string): string {
    if (nombre.endsWith('.jpeg')) {
      return nombre.slice(0, -5); // Elimina los últimos 5 caracteres (".jpeg")
    }
    return nombre;
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
    if (this.puntoVentaForm.valid) {
      const nombre = this.puntoVentaForm.get('nombre')?.value;
      const fotoControl = this.nombrefoto;
      const latitud = this.latitud.toString();
      const longitud = this.longitud.toString();
      const estatus = this.puntoVentaForm.get('estatus')?.value;
      const horario = this.puntoVentaForm.get('horario')?.value;

      if (this.id !== null) {
        const idAsNumber = parseInt(this.id, 10);
        if (!isNaN(idAsNumber)) {
          this.eventosService.actualizarPunto(idAsNumber, nombre, fotoControl, latitud, longitud, estatus, horario).subscribe({
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
        this.agregarService.registrarPunto(nombre, fotoControl, latitud, longitud, estatus, horario).subscribe({
          next: () => {
            this.router.navigate(['/admin/eventos']);
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    } else {
      console.log('Complete el formulario');
    }
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

}
