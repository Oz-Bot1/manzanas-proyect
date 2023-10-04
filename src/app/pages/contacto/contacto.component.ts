import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ContactoService } from 'src/app/service/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {
  latitud: number = 19.776097222715837;
  longitud: number = -97.38592150346066;
  lista: any[] = [];
  mapa: L.Map | undefined;

  constructor(private contactoService: ContactoService) { }

  ngOnInit(): void {
    this.contactoService.listaPuntos().subscribe({
      next: (data) => {
        this.lista = data.data;
        console.log(this.lista);
        this.inicializarMapa();
        this.agregarMarcadores(this.lista);
      },
      error: (error) => {
        console.log(error);
      }
    })
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
}
