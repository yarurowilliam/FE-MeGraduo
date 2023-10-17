import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { config } from 'src/config/config';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-proyecto-grado',
  templateUrl: './proyecto-grado.component.html',
  styleUrls: ['./proyecto-grado.component.css']
})
export class ProyectoGradoComponent {
  tittle1 = "1. INFORMACIÓN GENERAL DE LA PROPUESTA DE PROYECTO DE GRADO";
  rolEstablecido = "";
  tittle2 = "2. INFORMACIÓN ESPECIFICA DE LA PROPUESTA DE PROYECTO DE GRADO";
  identificacion = "";
  msgAdvertencia = "";
  generalInfo: FormGroup;
  specificInfo: FormGroup;
  tableComponent: { nombre: string }[] = [
    { nombre: "Nombre estudiante" },
    { nombre: "Identificación" },
    { nombre: "Número" },
    { nombre: "Programa Académico" },
    { nombre: "N° Creditos Aprobados" },
    { nombre: "% Créditos probados" },
    { nombre: "Correo electrónico" },
    { nombre: "Teléfono" },
    { nombre: "Celular" },
    { nombre: " " },
  ];
  

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) {
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
      txtEstudiante2: [''],
      txtEstudiante3: [''],
    });
    this.specificInfo = this.formBuilder.group({
      inv_line: ['', [Validators.required]],
      sub_inv_line:['', [Validators.required]],
      tematicArea:['', [Validators.required]],
      inv_group:['', [Validators.required]],
    })

    this.generateTestData();
  }


students: any[] = [];
generateTestData() {
  this.students = [
    {
      nombre: "Brahayan David Betancur Carrillo",
      identificacionTipo: "Cédula",
      nIdentificacion: "123456789",
      programaAcademico: "Ingeniería de Software",
      nCreditosAprobados: 120,
      porcentajeCreditosAprobados: 80,
      correoElectronico: "johndoe@example.com",
      telefono: "1234567890",
      celular: "9876543210",
    },
    {
      nombre: "Jane Mane Neigthware Postre",
      identificacionTipo: "Pasaporte",
      nIdentificacion: "987654321",
      programaAcademico: "Ingeniería de Sistemas",
      nCreditosAprobados: 150,
      porcentajeCreditosAprobados: 90,
      correoElectronico: "janesmith@example.com",
      telefono: "9876543210",
      celular: "1234567890",
    },
    {
      nombre: "Jane Mane Neigthware Postre",
      identificacionTipo: "Pasaporte",
      nIdentificacion: "987654321",
      programaAcademico: "Ingeniería Electrónica",
      nCreditosAprobados: 150,
      porcentajeCreditosAprobados: 90,
      correoElectronico: "janesmith@example.com",
      telefono: "9876543210",
      celular: "1234567890",
    },
    {
      nombre: "Jane Mane Neigthware Postre",
      identificacionTipo: "Pasaporte",
      nIdentificacion: "987654321",
      programaAcademico: "Ingeniería Ambiental",
      nCreditosAprobados: 150,
      porcentajeCreditosAprobados: 90,
      correoElectronico: "janesmith@example.com",
      telefono: "9876543210",
      celular: "1234567890",
    },
    {
      nombre: "Jane Mane Neigthware Postre",
      identificacionTipo: "Pasaporte",
      nIdentificacion: "987654321",
      programaAcademico: "Ingniería de Sistemas",
      nCreditosAprobados: 150,
      porcentajeCreditosAprobados: 90,
      correoElectronico: "janesmith@example.com",
      telefono: "9876543210",
      celular: "1234567890",
    },
  ];
}

selectedStudent: any;

onStudentSelection(student: any) {
  this.selectedStudent = student;
}


removeSelectedStudent() {
  if (this.selectedStudent) {
    const index = this.students.indexOf(this.selectedStudent);
    if (index !== -1) {
      this.students.splice(index, 1);
    }
    this.selectedStudent = null; // Limpiar la selección después de eliminar
  }
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

openAddUsersModal() {
  this.router.navigate(['/inf-general_addUsers']);
} 
  
}
