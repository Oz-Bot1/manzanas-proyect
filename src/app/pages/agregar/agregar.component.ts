import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgregarService } from 'src/app/service/agregar.service';
import { InventarioService } from 'src/app/service/inventario.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit, OnDestroy {
  titulo: string = 'Agregar Producto';
  tituloBoton: string = 'Agregar Producto';
  //id para actualizar
  id = localStorage.getItem('idAct');
  //Variables de la foto
  obj: any = {};
  nombrefoto: string = '';

  formulario: FormGroup;
  constructor(private router: Router, private agregarService: AgregarService, private formBuilder: FormBuilder, private inventarioService: InventarioService) {
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      precioKilo: ['', Validators.required],
      precioCaja: ['', Validators.required],
      precioTonelada: ['', Validators.required],
      descripcion: ['', Validators.required],
      stock: ['', Validators.required],
      nivel: ['', Validators.required],
      estatus: ['1', Validators.required]
    });
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }

  ngOnInit(): void {
    if (this.id !== null) {
      const idAsNumber = parseInt(this.id, 10);
      if (!isNaN(idAsNumber)) {
        this.titulo = "Actualizar Producto";
        this.tituloBoton = 'Actualizar Producto';
        this.buscarPunto(idAsNumber);
      } else {
        this.router.navigate(['/eventos']);
      }
    }
  }

  buscarPunto(id: number) {
    this.inventarioService.buscar(id).subscribe(
      {
        next: (data) => {
          const actividad = data.data[0];
          this.nombrefoto = actividad.foto;
          console.log(actividad);
          this.formulario.patchValue({
            nombre: actividad.nombre,
            estatus: actividad.estatus,
            descripcion: actividad.descripcion,
            nivel: actividad.nivelMadurez,
            precioCaja: actividad.precioCaja,
            precioKilo: actividad.precioKilo,
            precioTonelada: actividad.precioTonelada,
            stock: actividad.stock,
          });
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

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

  obtenerNombreImagen(nombre: string): string {
    if (nombre.endsWith('.jpeg')) {
      return nombre.slice(0, -5); // Elimina los últimos 5 caracteres (".jpeg")
    }
    return nombre;
  }

  submitForm() {
    if (this.formulario.valid) {
      const nombre = this.formulario.get('nombre')?.value;
      const precioKilo = this.formulario.get('precioKilo')?.value;
      const descripcion = this.formulario.get('descripcion')?.value;
      const fotoControl = this.nombrefoto;
      const stock = this.formulario.get('stock')?.value;
      const nivel = this.formulario.get('nivel')?.value;
      const estatus = this.formulario.get('estatus')?.value;
      const precioCaja = this.formulario.get('precioCaja')?.value;
      const precioTonelada = this.formulario.get('precioTonelada')?.value;

      if (this.id !== null) {
        const idAsNumber = parseInt(this.id, 10);
        if (!isNaN(idAsNumber)) {
          this.inventarioService.actualizar(idAsNumber, nombre, precioKilo, descripcion, fotoControl, stock, nivel, estatus, precioCaja, precioTonelada).subscribe({
            next: () => {
              this.router.navigate(['/inventario']);
            },
            error: (error) => {
              console.log(error);
            }
          });
        } else {
          this.router.navigate(['/eventos']);
        }
      } else {
        this.agregarService.registrarProducto(nombre, precioKilo, descripcion, fotoControl, stock, nivel, estatus, precioCaja, precioTonelada).subscribe({
          next: () => {
            this.router.navigate(['/inventario']);
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    } else {
      console.log('Complete el formulario');
    }
  }
}
