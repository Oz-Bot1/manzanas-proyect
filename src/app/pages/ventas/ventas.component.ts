import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentasService } from 'src/app/service/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  constructor(private router: Router, private ventasService: VentasService) { }

  pedidosLista: any[] = [];
  ventasLista: any[] = [];
  ngOnInit(): void {
    this.ventasService.listaPedidos().subscribe({
      next: (data) => {
        if (data && data.data && data.data.length > 0) {
          this.pedidosLista = data.data;
        } else {
          this.pedidosLista = [];
        }
      },
      error: (error) => {
        this.pedidosLista = [];
        console.error(error);
      }
    });

    this.ventasService.listaVentas().subscribe({
      next: (data) => {
        if (data && data.data && data.data.length > 0) {
          this.ventasLista = data.data;
        } else {
          this.ventasLista = [];
        }
      },
      error: (error) => {
        this.ventasLista = [];
        console.error(error);
      }
    });
  }

  idAct: number = 0;
  liberar(id: number) {
    localStorage.setItem('idAct', id.toString());
    this.router.navigate(['/admin/liberar']);

    console.log("ID del pedido a liberar:", id);
  }

}
