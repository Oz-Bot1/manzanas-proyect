import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  lista: any[] = [];

  constructor(private productos: ProductosService){}
  imagen: any = {};
  nombreImagen: string = "Upload-65146e84718d4-27092023";
  ngOnInit(): void {
    this.productos.lista().subscribe(
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
