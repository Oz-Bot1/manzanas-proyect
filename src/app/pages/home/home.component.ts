import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

Swiper.use([Navigation, Pagination, Autoplay]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    //prueba
    const swiper = new Swiper('.swiper-container', {
      direction: 'vertical', // O 'horizontal' si deseas scroll horizontal
      slidesPerView: 'auto', // Para que el contenido se ajuste al tamaño del contenedor
      freeMode: true, // Permite un scroll libre
  });
  
  }

}
