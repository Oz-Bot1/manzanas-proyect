import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LiberarService } from 'src/app/service/liberar.service';
import { VentasService } from 'src/app/service/ventas.service';

@Component({
  selector: 'app-liberar',
  templateUrl: './liberar.component.html',
  styleUrls: ['./liberar.component.scss']
})
export class LiberarComponent implements OnInit, OnDestroy {
  id = localStorage.getItem('idAct');
  formulario: FormGroup;
  formularioModal: FormGroup;
  confirmado: boolean = false;
  confirmadoDos: boolean = true;

  cambiarBtn() {
    this.confirmado = !this.confirmado;
    this.confirmadoDos = !this.confirmadoDos;
  }

  constructor(private router: Router, private ventas: VentasService, private fb: FormBuilder, private liberarService: LiberarService) {
    this.formulario = this.fb.group({
      ciudadCliente: ['', Validators.required],
      correoCliente: ['', [Validators.required, Validators.email]],
      estadoCliente: ['', Validators.required],
      fechaOrdenado: ['', Validators.required],
      nombreCliente: ['', Validators.required],
      telefonoCliente: ['', Validators.required],
      total: [0, Validators.required],
    });
    this.formularioModal = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(0)]],
      subtotal: [0, Validators.min(0)],
    });
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }
  
  idNumber: number = 0;
  ngOnInit(): void {
    if (this.id !== null) {
      const idAsNumber = parseInt(this.id, 10);
      if (!isNaN(idAsNumber)) {
        this.idNumber = idAsNumber;
        this.buscarPedido(idAsNumber);
      } else {
        this.router.navigate(['/eventos']);
      }
    }
  }

  guardarCambios() {
    if (this.formularioModal.valid) {
      const formDat = this.formularioModal.value;
      const formData = this.formulario.value;
      console.log('Formulario enviado con los siguientes datos:', formData);
      console.log('Formulario enviado con los siguientes datos:', formDat);
    }
  }

  onSubmit() {
    if (this.formulario.valid) {
      const id = this.idNumber;
      this.liberarService.liberar(id).subscribe({
        next: () => {
          this.router.navigate(['/ventas']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  datosPedido: any = {};
  datosManzanas: any[] = [];
  buscarPedido(id: number) {
    this.ventas.buscarPedido(id).subscribe({
      next: (data) => {
        this.datosPedido = data.data[0];
        this.datosManzanas = data.data[0].manzanas;
        this.formulario.patchValue({
          nombreCliente: this.datosPedido.nombreCliente,
          ciudadCliente: this.datosPedido.ciudadCliente,
          correoCliente: this.datosPedido.correoCliente,
          estadoCliente: this.datosPedido.estadoCliente,
          telefonoCliente: this.datosPedido.telefonoCliente,
          fechaOrdenado: this.datosPedido.fechaOrdenado,
          total: this.datosPedido.total,
        });
        console.log(this.datosManzanas);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
