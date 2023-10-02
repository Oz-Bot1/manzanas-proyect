import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgregarService } from 'src/app/service/agregar.service';
import { EventosService } from 'src/app/service/eventos.service';
import * as L from 'leaflet';

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

  constructor(private fb: FormBuilder, private eventosService: EventosService, private agregarService: AgregarService) {
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
  }

  idAct: number = 0;
  nombreProducto: string = '';
  buscarPunto(id: number) {
    this.eventosService.buscarPunto(id).subscribe(
      {
        next: (data) => {
          this.idAct = data.data[0].id;
          this.nombreProducto = data.data[0].nombre;
          const actividad = data.data[0];
          this.nombrefoto = actividad.foto;
          this.puntoVentaForm.patchValue({
            nombre: actividad.nombre,
            foto: actividad.foto,
            estatus: actividad.estatus,
            horario: actividad.horario,
          });
          this.latitud = actividad.latitud;
          this.longitud = actividad.longitud;
          console.log(this.latitud, this.longitud)
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          const map = L.map('map').setView([this.latitud, this.longitud], 15);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);

          // Crear un icono personalizado
          const customIcon = L.icon({
            iconUrl: '../../../assets/img/marcador.png',
            iconSize: [50, 50], // Tamaño del icono [ancho, alto]
            iconAnchor: [16, 32], // Punto de anclaje del icono [horizontal, vertical]
          });

          const marker = L.marker([this.latitud, this.longitud], { icon: customIcon })
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
    );
  }

  eliminarUltimosDigitos(coordenada: number, cantidadDigitos: number): number {
    const factor = Math.pow(10, cantidadDigitos);
    return Math.floor(coordenada * factor) / factor;
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

  actualizarPunto() {
    if (this.puntoVentaForm.valid) {
      const id = this.idAct;
      const nombre = this.puntoVentaForm.get('nombre')?.value;
      const fotoControl = this.nombrefoto;
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

}
