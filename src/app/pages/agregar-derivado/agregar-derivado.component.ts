import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgregarService } from 'src/app/service/agregar.service';
import { InventarioService } from 'src/app/service/inventario.service';

@Component({
  selector: 'app-agregar-derivado',
  templateUrl: './agregar-derivado.component.html',
  styleUrls: ['./agregar-derivado.component.scss']
})
export class AgregarDerivadoComponent {
  //id para actualizar
  id = localStorage.getItem('idAct');
  //Variables de la foto
  obj: any = {};
  nombrefoto: string = '';
  formulario: FormGroup;
  titulo: string = 'Agregar Derivado';
  tituloBoton: string = 'Agregar Derivado';

  constructor(private fb: FormBuilder, private agregarService: AgregarService, private router: Router, private invetarioService: InventarioService) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.id !== null) {
      const idAsNumber = parseInt(this.id, 10);
      if (!isNaN(idAsNumber)) {
        this.titulo = "Actualizar Derivado";
        this.tituloBoton = 'Actualizar Derivado';
        this.buscarEvento(idAsNumber);
      } else {
        this.router.navigate(['/admin/inventario']);
      }
    }
  }

  buscarEvento(id: number) {
    this.invetarioService.buscarDerivado(id).subscribe(
      {
        next: (data) => {
          const actividad = data.data[0];
          this.nombrefoto = actividad.foto;
          this.formulario.patchValue({
            nombre: actividad.nombre,
            descripcion: actividad.descripcion
          });
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  obtenerNombreImagen(nombre: string): string {
    if (nombre.endsWith('.jpeg')) {
      return nombre.slice(0, -5); // Elimina los últimos 5 caracteres (".jpeg")
    }
    return nombre;
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
  
  guardarDerivado() {
    if (this.formulario.valid) {
      const nombre = this.formulario.get('nombre')?.value;
      const foto = this.nombrefoto;
      const descripcion = this.formulario.get('descripcion')?.value;

      if (this.id !== null) {
        const idAsNumber = parseInt(this.id, 10);
        if (!isNaN(idAsNumber)) {
          this.invetarioService.actualizarDerivado(idAsNumber, nombre,descripcion, foto).subscribe({
            next: () => {
              this.router.navigate(['/admin/inventario']);
            },
            error: (error) => {
              console.log(error);
            }
          });
        } else {
          this.router.navigate(['/admin/inventario']);
        }
      } else {
        this.agregarService.registrarDerivado(nombre, foto, descripcion).subscribe({
          next: () => {
            this.router.navigate(['/admin/inventario']);
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
  
    } else {
      console.log('fromulario invalido');
    }
  }
  
}
