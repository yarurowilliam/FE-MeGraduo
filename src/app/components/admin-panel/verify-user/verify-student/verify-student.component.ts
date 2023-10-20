import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-verify-student',
  templateUrl: './verify-student.component.html',
  styleUrls: ['./verify-student.component.css']
})
export class VerifyStudentComponent {
  selectedStudent: any;
  modalVerifyStudent: FormGroup;
  emailFilter: string = '';
  students: any[] = [];
  loading = false;

  
  
  

  constructor(private formBuilder: FormBuilder, private router: Router,
     private personaService: PersonaService) {
        
    this.modalVerifyStudent = this.formBuilder.group({
      identificacion: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      primerNombre: [ '', [Validators.required]],
      segundoNombre: ['', [Validators.required]],
      primerApellido: [ '', [Validators.required]],
      segundoApellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      creditosAprobados: [''],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
    });  
  
  }



onStudentSelection(student: any) {
  this.selectedStudent = student;
}

//Metodo perfil de usuario guardar
verifyStudent(): void {
  console.log(this.modalVerifyStudent);

  
}

}
