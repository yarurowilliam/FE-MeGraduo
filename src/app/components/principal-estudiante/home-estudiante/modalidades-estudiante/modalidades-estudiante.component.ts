import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  comprobante: string = "Comprobar si aplico";

  constructor(private router: Router,
    private loginService: LoginService,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _service: ModalidadesEstudianteService,
    private cd: ChangeDetectorRef) 
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

    userApto():void{
      setTimeout(() => {
        this.comprobante = "Presentar propuesta";
      }, 1000);
      
      this.cd.detectChanges();
    }

async validarRequisitos(): Promise<void> {

  if (this.comprobante === "Presentar propuesta") {
    this.router.navigate(['/programa']);
    return;
  }

  try {
    const data = await this._service.validarRequisitos(parseInt(this.nombreUsuario)).toPromise();
    
    if (data == true) {
      this.toastr.success(
        'Usted cumple con los requisitos para presentar una propuesta!',
        'Validacion de Creditos'
      );
      this.userApto();
    }
    /*this.router.navigate(['/programa']);*/
    this.loading = false;
  } catch (error) {
    this.toastr.error(error.error.message, 'No es apto');
    this.loading = false;
  }
}
}
