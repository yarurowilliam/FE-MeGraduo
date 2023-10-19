import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from 'src/app/models/estudianteFullInfo';
import { Persona } from 'src/app/models/persona';
import { DocentesService } from 'src/app/services/docentes.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css'],
})
export class VerifyUserComponent implements OnInit {
  form: FormGroup;
  modalVerifyStudent: FormGroup;
  modalVerifyTeacher: FormGroup;
  emailFilter: string = '';
  estudiantes: any[] = [];
  id: number = 1;
  loading = false;

  tableComponent: { nombre: string }[] = [
    { nombre: 'Nombre' },
    { nombre: 'Identificación' },
    { nombre: 'Programa Académico' },
    { nombre: 'Correo electrónico' },
    { nombre: 'Verificacion' },
  ];
  toastR: any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private personaService: PersonaService,
    private estudianteService: EstudianteService,
    private docenteService: DocentesService
  ) {
    this.form = this.formBuilder.group({});

    this.modalVerifyStudent = this.formBuilder.group({
      identificacion: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ],
      ],
      primerNombre: ['', [Validators.required]],
      secondName: ['', [Validators.required]],
      fisrtLastName: ['', [Validators.required]],
      secondLastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      approbedCredits: [''],
    });

    this.modalVerifyTeacher = this.formBuilder.group({
      identificacion: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ],
      ],
      firstName: ['', [Validators.required]],
      secondName: ['', [Validators.required]],
      fisrtLastName: ['', [Validators.required]],
      secondLastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      status: [''],
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    // Llama al servicio para obtener la lista de estudiantes. Asumiendo que tienes el ID requerido.
    this.estudianteService.getListStudents(this.id).subscribe(async (data: any[]) => {
      this.estudiantes = data;
      let nombrePrograma = await this.programa();
      console.log("NaNN "+nombrePrograma)
      console.log(this.estudiantes);
    });
  }
  

  programa(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let idPrograma; 
      this.docenteService.getListPrograms().subscribe((data: any[]) => {
        const programaEncontrado = data.find(programa => programa.idPrograma === idPrograma);
  
        if (programaEncontrado) {
          resolve(programaEncontrado.nombrePrograma);
        } else {
          console.log("Programa no encontrado para el idPrograma: " + idPrograma);
          reject("Programa no encontrado");
        }
      });
    });
  }

  selectedStudent: any;

  onStudentSelection(student: any) {
    this.selectedStudent = student;
  }

  
  verifyStudent(): void {
    this.loading=true
    prompt("estamos verificando")
    this.loading=false
  }
}
