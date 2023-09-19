import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liberar',
  templateUrl: './liberar.component.html',
  styleUrls: ['./liberar.component.scss']
})
export class LiberarComponent {
  logout(){
    this.router.navigate(['/home']);
  }
  constructor(private router: Router) {}
}
