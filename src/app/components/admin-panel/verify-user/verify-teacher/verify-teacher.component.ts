import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { empty } from 'rxjs';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-verify-teacher',
  templateUrl: './verify-teacher.component.html',
  styleUrls: ['./verify-teacher.component.css']
})
export class VerifyTeacherComponent {
  @ViewChild('rolesSelect') rolesSelect: ElementRef | any;
  modalVerifyTeacher: FormGroup;
  emailFilter: string = '';
  students: any[] = [];
  selectedRoles: string[] = [];
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
     private personaService: PersonaService, private toastr: ToastrService) {
    this.modalVerifyTeacher = this.formBuilder.group({
      identification: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      firstName: [ '', [Validators.required]],
      secondName: ['', [Validators.required]],
      fisrtLastName: [ '', [Validators.required]],
      secondLastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      rolDefault: ['',],
      comentarios: [''],

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

roles= [
  { nombre: "Docente calificador" },
  { nombre: "Docente director" },
  { nombre: "Docente supervisor" },
  
];

selectedStudent: any;

onStudentSelection(student: any) {
  this.selectedStudent = student;
}

updateTextAreaContent() {
  this.modalVerifyTeacher.get('comentarios')?.setValue(this.selectedRoles.join(', '));
}

verifyTeacher():void{
  
}


addToSelectedRoles() {
  const selectedRole = this.modalVerifyTeacher.get('role')?.value;

  if (selectedRole) {
    const selectedRoleString = selectedRole.toString(); // Convertir a string
    const indexToRemove = this.roles.findIndex(role => role.nombre === selectedRoleString);

    if (indexToRemove !== -1) {
      this.roles.splice(indexToRemove, 1); // Eliminar el rol del arreglo roles
      this.selectedRoles.push(selectedRoleString); // Agregar el rol al arreglo selectedRoles
      this.updateTextAreaContent();
    } else {
      this.toastr.warning('Este rol ya está agregado', 'Rol Duplicado');
    }
  }
}





}
