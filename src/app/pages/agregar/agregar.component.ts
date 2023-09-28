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
  ventas() {
    this.router.navigate(['/ventas']);
  }

  inventario() {
    this.router.navigate(['/inventario']);
  }

  logout() {
    this.login.logout();
  }

  agregar() {
    this.router.navigate(['/agregar'])
  }

  formulario: FormGroup;
  constructor(private router: Router, private agregarService: AgregarService, private formBuilder: FormBuilder, private login: LoginService) {
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      stock: ['', Validators.required],
      nivel: ['', Validators.required],
      estatus: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  }

  obj: any = {};
  onFileSelect(input: any) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.obj.photoUrl = e.target.result;
      }
      reader.readAsDataURL(input.files[0]);
      //Una vez que esta en 
      console.log(this.obj.photoUrl)
      this.agregarService.saveImage(this.obj.photoUrl).subscribe({
        next: (data) => {
          console.log("Se guardo la imagen");
        },
        error: (error) => {
          console.log(error);
        }

      });
    }
  }

  submitForm() {
    if (this.formulario.valid) {
      const nombre = this.formulario.get('nombre')?.value;
      const precio = this.formulario.get('precio')?.value;
      const descripcion = this.formulario.get('descripcion')?.value;
      const fotoControl = this.obj.photoUrl;
      const stock = this.formulario.get('stock')?.value;
      const nivel = this.formulario.get('nivel')?.value;
      const estatus = this.formulario.get('estatus')?.value;

      this.agregarService.registrar(nombre, precio, descripcion, fotoControl, stock, nivel, estatus).subscribe({
        next: () => {
          this.router.navigate(['/ventas']);
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
