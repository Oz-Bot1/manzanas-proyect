import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HomeService } from 'src/app/service/home.service';
import { LoginService } from 'src/app/service/login.service';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

Swiper.use([Navigation, Pagination, Autoplay]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  idRol: string = this.cookie.get('idRol');
  banderaId: boolean = false;

  banderaRol(){
    //modificar al 2 para productores
    if(this.idRol == "3"){
      this.banderaId = true;
    }else{
      this.banderaId = false;
    }
  }

  constructor(private homeService: HomeService, private cookie: CookieService){}

  ngOnInit(): void {
    this.banderaRol();
    //prueba
    const swiper = new Swiper('.swiper-container', {
      direction: 'vertical', // O 'horizontal' si deseas scroll horizontal
      slidesPerView: 'auto', // Para que el contenido se ajuste al tamaño del contenedor
      freeMode: true, // Permite un scroll libre
  });
  
  }

}
