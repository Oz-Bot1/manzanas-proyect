import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { NotasService } from 'src/app/service/notas.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  listaMensajes: any[] = [];
  banderaMensaje: boolean = false;

  constructor(private router: Router, private login: LoginService, private notasService: NotasService) {}

  ngOnInit(): void {
    this.notasService.listaNotas().subscribe(
      {
        next: (data) => {
          if(data.data.length){
          this.listaMensajes = data.data;
          }
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          if(this.listaMensajes.length) {
            this.banderaMensaje = true;
          }else {
            this.banderaMensaje = false;
          }
        }
      }
    );
  }

  logout() {
    this.login.logout();
  }

  agregarProducto() {
    this.router.navigate(['/admin/agregar']);
  }

  agregarDerivado() {
    this.router.navigate(['/admin/agregarDerivado']);
  }

  agregarActividad(){
    this.router.navigate(['/admin/agregarActividad']);
  }

  agregarEvento(){
    this.router.navigate(['/admin/agregarEvento']);
  }

  agregarPunto(){
    this.router.navigate(['/admin/agregarPunto']);
  }

  agregarProductor(){
    this.router.navigate(['/admin/agregarProductor']);

  }

  aceptarNota(idAux: string) {
    const id = idAux;
    this.notasService.aceptarNota(id).subscribe(
      {
        next: () => {
          location.reload();
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  rechazarNota(idAux:number) {
    const id = idAux;
    this.notasService.rechazarNota(id).subscribe(
      {
        next: () => {
          location.reload();
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

}
