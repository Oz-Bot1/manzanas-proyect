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
  ngOnInit(): void {
    this.ventasService.listaPedidos().subscribe({
      next: (data) => {
        this.pedidosLista = data.data;
        console.log(this.pedidosLista);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  idAct: number = 0;
  liberar(id: number) {
    localStorage.setItem('idAct', id.toString());
    this.router.navigate(['/liberar']);

    console.log("ID del pedido a liberar:", id);
  }

}
