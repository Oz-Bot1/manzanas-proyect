import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {
  coor1:number = 19.776097222715837;
  coor2:number = -97.38592150346066;
  ngOnInit(): void {
    const map = L.map('map').setView([this.coor1, this.coor2], 15);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  
    L.marker([this.coor1, this.coor2]).addTo(map)
      .bindPopup('¡Hola, mundo!')
      .openPopup();
  }
}
