import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgregarService } from 'src/app/service/agregar.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-agregar-evento',
  templateUrl: './agregar-evento.component.html',
  styleUrls: ['./agregar-evento.component.scss']
})
export class AgregarEventoComponent implements OnInit {
  eventoForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private agregarService: AgregarService) {
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  coor1: number = 19.776097222715837;
  coor2: number = -97.38592150346066;
  latitud: number = 0;
  longitud: number = 0;
  ngOnInit(): void {
    const map = L.map('map').setView([this.coor1, this.coor2], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Crear un icono personalizado
    const customIcon = L.icon({
      iconUrl: '../../../assets/img/marcador.png',
      iconSize: [50, 50], // Tamaño del icono [ancho, alto]
      iconAnchor: [16, 32], // Punto de anclaje del icono [horizontal, vertical]
    });

    const marker = L.marker([this.coor1, this.coor2], { icon: customIcon })
      .bindPopup('¡Aqui!')
      .openPopup();

    marker.addTo(map);

    // Configurar evento de clic en el mapa
    map.on('click', (e) => {
      // Obtener las coordenadas donde se hizo clic
      const latLng = e.latlng;

      // Mover el marcador a las coordenadas donde se hizo clic
      marker.setLatLng(latLng);

      this.latitud = latLng.lat;
      this.longitud = latLng.lng;
    });
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

  onSubmit() {
    if (this.eventoForm.valid) {
      const nombre = this.eventoForm.get('nombre')?.value;
      const descripcion = this.eventoForm.get('descripcion')?.value;
      const fechaInicio = this.eventoForm.get('fechaInicio')?.value;
      const fechaFin = this.eventoForm.get('fechaFin')?.value;
      const latitud = this.latitud.toString();
      const longitud = this.longitud.toString();
      const foto = "Upload-6518a96cabc38-01102023.jpeg";
      //Upload-6518a96cabc38-01102023.jpeg

      this.agregarService.registrarEvento(nombre, descripcion, fechaInicio, fechaFin, latitud, longitud, foto).subscribe({
        next: () => {
          this.router.navigate(['/eventos']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      console.log('Complete el formulario');
    }
  }
}