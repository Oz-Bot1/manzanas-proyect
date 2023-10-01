import { Component, OnInit } from '@angular/core';
import { ActividadesService } from 'src/app/service/actividades.service';
import { InventarioService } from 'src/app/service/inventario.service';

@Component({
  selector: 'app-actividades-admin',
  templateUrl: './actividades-admin.component.html',
  styleUrls: ['./actividades-admin.component.scss']
})
export class ActividadesAdminComponent implements OnInit {
  lista: any[] = [];

  constructor(private actividadesService: ActividadesService ){}

  ngOnInit(): void {
    this.actividadesService.lista().subscribe(
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
