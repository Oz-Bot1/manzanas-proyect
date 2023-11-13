import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NotasService } from 'src/app/service/notas.service';
import Swiper, { Pagination, Navigation } from 'swiper';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.scss']
})
export class QuienesSomosComponent implements OnInit {
  idRol: string = this.cookie.get('idRol');
  idUser: string = this.cookie.get('idUser');
  banderaId: boolean = false;
  formulario: FormGroup;

  banderaRol() {
    if (this.idRol == "2") {
      this.banderaId = true;
    } else {
      this.banderaId = false;
    }
  }

  constructor(private homeService: NotasService, private cookie: CookieService, private fb: FormBuilder, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Mueve la página al inicio
      }
    });
    this.formulario = this.fb.group({
      tipoManzana: ['1', Validators.required],
      tipoMensaje: ['1', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]], // Valor predeterminado: 1
    });
  }

  listaIdManzana: any[] = [];
  listaMensaje: any[] = [];
  ngOnInit(): void {
    this.banderaRol();

    if (this.banderaId == true) {
      this.homeService.listaManzanas().subscribe({
        next: (data) => {
          this.listaIdManzana = data.data;
        },
        error: (error) => {
          console.log(error);
        }
      });

      this.homeService.listaTipoNotas().subscribe({
        next: (data) => {
          this.listaMensaje = data.data;
        },
        error: (error) => {
          console.log(error);
        }
      });
    }

    const swiper = new Swiper('.mySwiper', {
      modules: [Pagination, Navigation],
      loop: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        
      },
      spaceBetween: 16,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
      }
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      const formData = this.formulario.value;
      const cantidad = formData.cantidad;
      const tipoManzana = formData.tipoManzana;
      const tipoMensaje = formData.tipoMensaje;
      const idUser = this.idUser;
      this.homeService.crear(tipoManzana, tipoMensaje, cantidad, idUser).subscribe({
        next: () => {
          location.reload();
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

}
