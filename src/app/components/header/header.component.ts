import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { config } from 'src/config/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuComponent = config.menuComponent;
  currentDate: Date;

  constructor(private router:Router,
              private loginService: LoginService,
              private toastr: ToastrService) {
    this.currentDate = new Date();
  }

  navigateToComponent(url: string) {
    this.router.navigate([url]);
  }

  logOut(): void{ 
    this.loginService.removeLocalStorge();
    this.router.navigate(['/login']);
    this.toastr.warning('Gracias por utilizar nuestros servicios', 'Sesion finalizada');
  }

}
