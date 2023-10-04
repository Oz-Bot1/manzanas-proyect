import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgregarService } from 'src/app/service/agregar.service';

@Component({
  selector: 'app-agregar-derivado',
  templateUrl: './agregar-derivado.component.html',
  styleUrls: ['./agregar-derivado.component.scss']
})
export class AgregarDerivadoComponent {
  formulario: FormGroup;

  constructor(private fb: FormBuilder, private agregarService: AgregarService, private router: Router) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      foto: [''],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      foto: [''],
      descripcion: ['', Validators.required],
    });
  }

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
  
  guardarDerivado() {
    if (this.formulario.valid) {
      const nombre = this.formulario.get('nombre')?.value;
      const foto = this.nombrefoto;
      const descripcion = this.formulario.get('descripcion')?.value;

      this.agregarService.registrarDerivado(nombre, foto, descripcion).subscribe({
        next: () => {
          this.router.navigate(['/inventario']);
        },
        error: (error) => {
          console.log(error);
        }
      });
  
    } else {
      console.log('fromulario invalido');
    }
  }
  
}
