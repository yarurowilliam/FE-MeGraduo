import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/models/persona';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';



@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent {

  form: FormGroup;
  modalVerifyStudent: FormGroup;
  modalVerifyTeacher: FormGroup;
  emailFilter: string = '';
  students: any[] = [];
  loading = false;

  
  
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
    { nombre: "Rol" },
    { nombre: "Ver más" },
  ];
  toastR: any;
  

  constructor(private formBuilder: FormBuilder, private router: Router,
     private personaService: PersonaService) {
    this.form = this.formBuilder.group({
      
    });
    
    this.modalVerifyStudent = this.formBuilder.group({
      identification: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      firstName: [ '', [Validators.required]],
      secondName: ['', [Validators.required]],
      fisrtLastName: [ '', [Validators.required]],
      secondLastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      approbedCredits: [''],
   
    });

    this.modalVerifyTeacher = this.formBuilder.group({
      identification: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      firstName: [ '', [Validators.required]],
      secondName: ['', [Validators.required]],
      fisrtLastName: [ '', [Validators.required]],
      secondLastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      status: [''],

    })
    this.generateTestData();
    
  
  }


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
      rol: "Docente"
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
      rol: "Docente"
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
      rol: "Docente"
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
      rol: "estudiante"
    },
    {
      nombre: "Jane Mane Neigthware Postre",
      identificacionTipo: "Pasaporte",
      nIdentificacion: "987654321",
      programaAcademico: "Ingniería de Tabaco",
      nCreditosAprobados: 150,
      porcentajeCreditosAprobados: 90,
      correoElectronico: "janesmith@example.com",
      telefono: "9876543210",
      celular: "1234567890",
      rol: "Docente"
    },
  ];
}

selectedStudent: any;

onStudentSelection(student: any) {
  this.selectedStudent = student;
}

//Metodo perfil de usuario guardar
verifyStudent(): void {
  
}



}
