import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/service/eventos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  listaPuntos: any[] = [];

  constructor(private eventosService: EventosService) {}
  ngOnInit(): void {
    this.eventosService.listaPuntos().subscribe({
      next: (data) => {
        this.listaPuntos = data.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


}
