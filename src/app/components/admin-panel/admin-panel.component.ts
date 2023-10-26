import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  isSelectedOption: string = 'userVerification'; // Opción por defecto seleccionada
  isSubMenuOpen: boolean = true; // Submenú desplegado por defecto

  /**
   *
   */
  constructor(private loginService: LoginService,
              private router: Router,
              private toastr: ToastrService) {
    
    
  }

  logOut(): void {
    this.loginService.removeLocalStorge();
    this.router.navigate(['/login']);
    this.toastr.warning(
      'Gracias por utilizar nuestros servicios',
      'Sesion finalizada'
    );
    console.clear()
  }
}
