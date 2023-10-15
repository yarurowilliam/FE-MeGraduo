import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from 'src/app/models/estudianteFullInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalidadesEstudianteService } from './modalidades-estudiante.service';

@Component({
  selector: 'app-modalidades-estudiante',
  templateUrl: './modalidades-estudiante.component.html',
  styleUrls: ['./modalidades-estudiante.component.css']
})
export class ModalidadesEstudianteComponent {
  loading = false;
  nombreUsuario: string;
  rolU: string;
  estudiante : Estudiante;

  constructor(private router: Router,
    private loginService: LoginService,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _service: ModalidadesEstudianteService) 
    {}

    ngOnInit(): void {
      this.getNombreUsuario();
      console.log(this.nombreUsuario + " " + this.rolU);
    }

    getNombreUsuario(): void{
      this.nombreUsuario = this.loginService.getTokenDecoded().sub;
      this.rolU = this.loginService.getTokenDecoded().sid;
      this.getInfoEstudiante();
    }
  
    getInfoEstudiante(): void {
      this.loginService.getEstudianteDeatils(parseInt(this.nombreUsuario)).subscribe(
        data => {
          this.estudiante = data;
          console.log(this.estudiante);
        },
        error => {
          console.log(error);
        }
      );
    }

async validarRequisitos(): Promise<void> {

  try {
    const data = await this._service.validarRequisitos(parseInt(this.nombreUsuario)).toPromise();
    
    if (data == true) {
      this.toastr.success(
        'Usted cumple con los requisitos para presentar una propuesta!',
        'Validacion de Creditos'
      );
    }
    /*this.router.navigate(['/programa']);*/
    this.loading = false;
  } catch (error) {
    this.toastr.error(error.error.message, 'No es apto');
    this.loading = false;
  }
}
}
