import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  home() {
    this.router.navigate(['/home']);
  }
  logout() {
    this.loginService.logout();
  }
  constructor(private router: Router, private loginService: LoginService, private cookie: CookieService) { }
  ngOnInit(): void {
    const isLoggedInString = this.cookie.get('idUser');
    if (isLoggedInString !== '1' && isLoggedInString !== '') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
}
