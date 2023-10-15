import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-info-add-student',
  templateUrl: './general-info-add-student.component.html',
  styleUrls: ['./general-info-add-student.component.css']
})
export class GeneralInfoAddStudentComponent {
  searchText: string = '';
  modalAddStudentProyect: FormGroup;

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
    {nombre: "Estado"},
    { nombre: " " },
  ];

  TipoID = [
    { type: "CC" },
    { type: "TI" },
    { type: "Passport" },
  ];

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.modalAddStudentProyect = this.formBuilder.group({
      TipoID: ['']
    });

    this.generateTestData();
  }


  students: any[] = [];
generateTestData() {
  this.students = [
    {
      nombre: "Juan Jose Carrillo Comanche",
      identificacionTipo: "Cédula",
      nIdentificacion: "123456789",
      programaAcademico: "Ingeniería de Software",
      nCreditosAprobados: 120,
      porcentajeCreditosAprobados: 80,
      correoElectronico: "johncarrillo@example.com",
      telefono: "1234567890",
      celular: "9876543210",
      estado: "Disponible"
      },
    {
      nombre: "Carlos Ramírez Sánchez",
      identificacionTipo: "Licencia de Conducir",
      nIdentificacion: "C78901234",
      programaAcademico: "Administración de Empresas",
      nCreditosAprobados: 90,
      porcentajeCreditosAprobados: 70,
      correoElectronico: "carlos.ramirez@example.com",
      telefono: "333-456-7890",
      celular: "5557891234",
      estado: "Disponible"
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

onSearchInput(event: any) {
  const searchValue = event.target.value;
  this.searchStudents(searchValue);
}

searchStudents(searchValue: string) {
  if (searchValue.trim() === '') {
    // Si el texto de búsqueda está vacío, mostrar todos los estudiantes
    this.generateTestData();
  } else {
    // Filtrar estudiantes según el texto de búsqueda y el campo correspondiente
    this.students = this.students.filter(student => {
      const normalizedSearchText = searchValue.toLowerCase();
      return (
        student.nombre.toLowerCase().includes(normalizedSearchText) ||
        student.identificacionTipo.toLowerCase().includes(normalizedSearchText) ||
        student.nIdentificacion.includes(searchValue)  ||
        student.correoElectronico.toLowerCase().includes(normalizedSearchText)
        // Agrega más campos según lo necesario
      );
    });
  }
}



}
