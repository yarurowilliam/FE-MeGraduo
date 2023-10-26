import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { config } from 'src/config/config';
import { LoginService } from 'src/app/services/login.service';
import { EstudiantesValidadosModalComponent } from './estudiantes-validados-modal/estudiantes-validados-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Estudiante } from 'src/app/models/estudianteFullInfo';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ProyectoGrado } from 'src/app/models/proyectoGrado';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-proyecto-grado',
  templateUrl: './proyecto-grado.component.html',
  styleUrls: ['./proyecto-grado.component.css']
})
export class ProyectoGradoComponent implements OnInit {
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
  specificInfo: FormGroup;  
  emailIntegrante1 = "";
  emailIntegrante2 = "";
  emailIntegrante3 = "";
  emailDirector = "";
  estadoIntegrante1 = "";
  estadoIntegrante2 = "";
  estadoIntegrante3 = "";
  estudiantePrinciapal: Estudiante;
  loading = false;

  constructor(private loginService: LoginService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private proyectoService : ProyectoService,
    private route: ActivatedRoute) {
    this.rolEstablecido = this.loginService.getRoleLocalStorage();
    console.log(this.rolEstablecido); 
    if (this.rolEstablecido.includes("ESTUDIANTE")) {
      this.identificacion = this.loginService.getIdentificationLocalStorage();
      this.getInfoEstudiante();
      this.estadoIntegrante1 = "ACEPTADA";
      this.msgAdvertencia = "Por defecto estara el estudiante que esta inscribiendo la propuesta, puede buscar y agregar mas estudiantes o presentar la propuesta usted solo."
    }else{
      this.identificacion = "";
      this.msgAdvertencia = "Es recomendable que la presentacion se haga desde la cuenta de un estudiante, pero como docente se le permite hacer el registro, ADVERTENCIA: La propuesta queda presentada por el estudiante 1 y aparecera como includio para el estudiante 2 y 3."
    }
    this.specificInfo = this.formBuilder.group({
      txtTitulo: ['', [Validators.required]],
      txtEstudiante1: [this.identificacion, [Validators.required]],
      txtEstudiante2: [this.identificacion2],
      txtEstudiante3: [this.identificacion3],
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

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['data'];
  }


specificInfoSave() {
  if (this.specificInfo.invalid) {
    return;
  }
  this.loading = true;

  const proyectoGrado: ProyectoGrado = {
    idModalidad : 1,
    titulo : this.specificInfo.value.txtTitulo,
    idIntegrante1 : parseInt(this.specificInfo.value.txtEstudiante1),
    emailIntegrante1 : this.emailIntegrante1,
    estadoIntegrante1 : this.estadoIntegrante1,
    idIntegrante2 : parseInt(this.specificInfo.value.txtEstudiante2) ?? null,
    emailIntegrante2 : this.emailIntegrante2 ?? null,
    estadoIntegrante2 : this.estadoIntegrante2 ?? null,
    idIntegrante3 : parseInt(this.specificInfo.value.txtEstudiante3) ?? null,
    emailIntegrante3 : this.emailIntegrante3  ?? null,
    estadoIntegrante3 : this.estadoIntegrante3 ?? null,
    fechaCreacion : new Date(),
    lineaInvestigacion : this.specificInfo.value.inv_line,
    subLineaInvestigacion : this.specificInfo.value.sub_inv_line,
    areaTematica : this.specificInfo.value.tematicArea,
    grupoInvestigacion : this.specificInfo.value.inv_group,
    planteamientoProblema : this.specificInfo.value.planteamiento,
    justificacion : this.specificInfo.value.justificacion,
    objetivoGeneral : this.specificInfo.value.objetivoGeneral,
    objetivosEspecificos : this.specificInfo.value.objetivoEspecifico,
    bibliografia : this.specificInfo.value.bibliografia,
    idDirector : null,
    emailDirector : null,
    estadoDirector : null,
    tipoFase : "PROPUESTA",
    estadoProyecto : "PROPUESTA PENDIENTE"
};

console.log(proyectoGrado);

this.proyectoService.postProyecto(proyectoGrado).subscribe(
  response => {
    this.toastr.success(response.message, 'Éxito');
    this.loading = false;
    //this.router.navigate(['inf-espcifica']);
  },
  error => {
    this.toastr.error('Ha ocurrido un error al guardar la información.', 'Error');
    this.loading = false;
  }
);
}

getInfoEstudiante(): void {
  this.loginService.getEstudianteDeatils(parseInt(this.identificacion)).subscribe(
    data => {
      this.estudiantePrinciapal = data;
      this.emailIntegrante1 = data.email;
      console.log(this.emailIntegrante1);
      console.log(this.estudiantePrinciapal);
    },
    error => {
      console.log(error);
    }
  );
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
    this.emailIntegrante2 = estudiante.email.toString();
    this.estadoIntegrante2 = "PENDIENTE DE ACEPTACION";
    this.specificInfo.controls['txtEstudiante2'].setValue(estudiante.identificacion.toString());
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
    this.emailIntegrante3 = estudiante.email.toString();
    this.estadoIntegrante3 = "PENDIENTE DE ACEPTACION";
    this.toastr.success('El estudiante se ha agregado correctamente', 'Éxito');   
    this.specificInfo.controls['txtEstudiante3'].setValue(estudiante.identificacion.toString());
    console.log(this.identificacion2);
  }
}
  
}
