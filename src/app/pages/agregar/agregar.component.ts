import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgregarService } from 'src/app/service/agregar.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  formulario: FormGroup;
  constructor(private router: Router, private agregarService: AgregarService, private formBuilder: FormBuilder, private login: LoginService) {
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      stock: ['', Validators.required],
      nivel: ['', Validators.required],
      estatus: ['1', Validators.required]
    });
  }
  ngOnInit(): void {
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

  submitForm() {
    if (this.formulario.valid) {
      const nombre = this.formulario.get('nombre')?.value;
      const precio = this.formulario.get('precio')?.value;
      const descripcion = this.formulario.get('descripcion')?.value;
      const fotoControl = this.nombrefoto;
      const stock = this.formulario.get('stock')?.value;
      const nivel = this.formulario.get('nivel')?.value;
      const estatus = this.formulario.get('estatus')?.value;

      this.agregarService.registrarProducto(nombre, precio, descripcion, fotoControl, stock, nivel, estatus).subscribe({
        next: () => {
          this.router.navigate(['/inventario']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      console.log('Complete el formulario');
    }
  }
}
