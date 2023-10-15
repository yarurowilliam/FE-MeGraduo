import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-docente-panel',
  templateUrl: './docente-panel.component.html',
  styleUrls: ['./docente-panel.component.css']
})
export class DocentePanelComponent  {
  isSelectedOption: string = ' '; // Opción por defecto seleccionada
  isSubMenuOpen: boolean = true; // Submenú desplegado por defecto
  tipoDeDocente: string = "DOCENTE";
  loading = false;

  constructor(private loginService: LoginService, private router: Router, private toastr: ToastrService){}


  logOut(): void{ 
    this.loginService.removeLocalStorge();
    this.router.navigate(['/login']);
    this.toastr.warning('Gracias por utilizar nuestros servicios', 'Sesion finalizada');
  }

  // Función para cambiar la opción de director docente
docenteDirectorOptions(opcion: string): void {
  this.isSelectedOption = opcion;
  console.log("Soy la opción:" + this.isSelectedOption);

  // Mostrar el loading antes de la navegación
  
  this.router.navigate(['/docente-panel/blank'])
  // Usar un temporizador para ocultar el loading después de un retraso (por ejemplo, 1 segundo)
  timer(1000).subscribe(() => {
    // Realizar la navegación
    this.router.navigate(['/docente-panel/docente-director'], { queryParams: { selectedOption: opcion } });

   
  });
}
}
