import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { config } from 'src/config/config';
import { LoginService } from 'src/app/services/login.service';
import { EstudiantesValidadosModalComponent } from './estudiantes-validados-modal/estudiantes-validados-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Estudiante } from 'src/app/models/estudianteFullInfo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-proyecto-grado',
  templateUrl: './proyecto-grado.component.html',
  styleUrls: ['./proyecto-grado.component.css']
})
export class ProyectoGradoComponent {
  tittle1 = "1. INFORMACIÓN GENERAL DE LA PROPUESTA DE PROYECTO DE GRADO";
  rolEstablecido = "";
  tittle2 = "2. INFORMACIÓN ESPECIFICA DE LA PROPUESTA DE PROYECTO DE GRADO";
  tittle3 = "3. PLANTEAMIENTO/FORMULACION DEL PROBLEMA Y JUSTIFICACIÓN";
  tittle5 = "5. OBJETIVO GENERAL Y ESPEFICICOS";
  tittle7 = "7. BIBLIOGRAFÍA";
  identificacion = "";
  identificacion2 = "";
  identificacion3 = "";
  msgAdvertencia = "";
  generalInfo: FormGroup;
  specificInfo: FormGroup;  

  constructor(private loginService: LoginService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService) {
    this.rolEstablecido = this.loginService.getRoleLocalStorage();
    console.log(this.rolEstablecido); 
    if (this.rolEstablecido.includes("ESTUDIANTE")) {
      this.identificacion = this.loginService.getIdentificationLocalStorage();
      this.msgAdvertencia = "Por defecto estara el estudiante que esta inscribiendo la propuesta, puede buscar y agregar mas estudiantes o presentar la propuesta usted solo."
    }else{
      this.identificacion = "";
      this.msgAdvertencia = "Es recomendable que la presentacion se haga desde la cuenta de un estudiante, pero como docente se le permite hacer el registro, ADVERTENCIA: La propuesta queda presentada por el estudiante 1 y aparecera como includio para el estudiante 2 y 3."
    }
    this.generalInfo = this.formBuilder.group({
      txtTitulo: ['', [Validators.required]],
      txtEstudiante1: [this.identificacion, [Validators.required]],
      txtEstudiante2: [this.identificacion2],
      txtEstudiante3: [this.identificacion3],
    });
    this.specificInfo = this.formBuilder.group({
      inv_line: ['', [Validators.required]],
      sub_inv_line:['', [Validators.required]],
      tematicArea:['', [Validators.required]],
      inv_group:['', [Validators.required]],
      planteamiento: ['', [Validators.required]],
      justificacion: ['', [Validators.required]],
      objetivoGeneral: ['', [Validators.required]],
      objetivoEspecifico: ['', [Validators.required]],
      bibliografia: ['', [Validators.required]]
    })
  }

generalInfoSave() {
  if (this.generalInfo.invalid) {
    return;
  }
  console.log(this.generalInfo.value);
  this.router.navigate(['inf-espcifica']);
}

specificInfoSave() {
  if (this.generalInfo.invalid) {
    return;
  }
  console.log(this.generalInfo.value);
  this.router.navigate(['inf-espcifica']);
}

openModalEstudiante() {
  this.modalService.open(EstudiantesValidadosModalComponent, { size: 'lg' }).result.then((estudiante) => this.actualizarEstudiante(estudiante));
}

actualizarEstudiante(estudiante: Estudiante) {
  if(this.identificacion === estudiante.identificacion.toString() || this.identificacion3 === estudiante.identificacion.toString()){
    this.toastr.error('El estudiante ya se encuentra registrado en la propuesta', 'Error');
  }else{
    this.toastr.success('El estudiante se ha agregado correctamente', 'Éxito');
    this.identificacion2 = estudiante.identificacion.toString();
    this.generalInfo.controls['txtEstudiante2'].setValue(estudiante.identificacion.toString());
    console.log(this.identificacion2);
  }
}

openModalEstudiante2() {
  this.modalService.open(EstudiantesValidadosModalComponent, { size: 'lg' }).result.then((estudiante) => this.actualizarEstudiante2(estudiante));
}

actualizarEstudiante2(estudiante: Estudiante) {
  if(this.identificacion2 === estudiante.identificacion.toString() || this.identificacion === estudiante.identificacion.toString()){
    this.toastr.error('El estudiante ya se encuentra registrado en la propuesta', 'Error');
  }else{
    this.identificacion3 = estudiante.identificacion.toString();
    this.toastr.success('El estudiante se ha agregado correctamente', 'Éxito');   
    this.generalInfo.controls['txtEstudiante3'].setValue(estudiante.identificacion.toString());
    console.log(this.identificacion2);
  }
}
  
}
