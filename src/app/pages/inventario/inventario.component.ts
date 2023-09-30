import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventarioService } from 'src/app/service/inventario.service';
import { LoginService } from 'src/app/service/login.service';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

Swiper.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {
  lista: any[] = [];

  constructor(private inventarioService: InventarioService){}

  ngOnInit(): void {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
      },
      autoplay: {
        delay: 3000,
      },
    });
    this.inventarioService.lista().subscribe(
      {
        next: (data) => {
          this.lista = data.data;
          console.log(this.lista);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
        }
      }
    );
  }

}
