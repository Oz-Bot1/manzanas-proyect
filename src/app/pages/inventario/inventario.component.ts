import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgregarService } from 'src/app/service/agregar.service';
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

  constructor(private formBuilder: FormBuilder, private inventarioService: InventarioService, private agregarService: AgregarService) {
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      stock: ['', Validators.required],
      nivel: ['', Validators.required],
      estatus: ['1', Validators.required]
    });
  }

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

  idAct: number = 0;
  nombreProducto: string = '';
  buscar(id: number) {
    this.inventarioService.buscar(id).subscribe(
      {
        next: (data) => {
          this.idAct = data.data[0].id;
          this.nombreProducto = data.data[0].nombre;
          const actividad = data.data[0];
          this.nombrefoto = actividad.foto;
          this.formulario.patchValue({
            nombre: actividad.nombre,
            descripcion: actividad.descripcion,
            foto: actividad.foto,
            nivel: actividad.nivelMadurez,
            stock: actividad.stock,
            precio: actividad.precio,
            estatus: actividad.estatus
          });
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  formulario: FormGroup;

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


  submitForm() {
    if (this.formulario.valid) {
      const id = this.idAct.toString();
      const nombre = this.formulario.get('nombre')?.value;
      const precio = this.formulario.get('precio')?.value;
      const descripcion = this.formulario.get('descripcion')?.value;
      const fotoControl = this.nombrefoto;
      const stock = this.formulario.get('stock')?.value;
      const nivel = this.formulario.get('nivel')?.value;
      const estatus = this.formulario.get('estatus')?.value;

      this.inventarioService.actualizar(id, nombre, precio, descripcion, fotoControl, stock, nivel, estatus).subscribe({
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

  eliminar() {
    const id = this.idAct;
    this.inventarioService.eliminar(id).subscribe({
      next: () => {
        location.reload();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
