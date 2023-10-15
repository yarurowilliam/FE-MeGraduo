import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.css']
})
export class ProgramaComponent {
  programForm: FormGroup;
  loading = false;

  
  sedeItems = [
    { nombre: "Valledupar" },
    { nombre: "Aguachica" },
    { nombre: "Codazzi" },
  ];

  facultadItems = [
    { nombre: "Ingeniería y tecnologías" }
  ];
  
  programaItems = [
    { nombre: "Ing. de Sistemas" },
    { nombre: "Ing. Electrónica" },
    { nombre: "Ing. Ambiental" },
    { nombre: "Ing. Agroindustrial" }
  ];

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.programForm = this.formBuilder.group({
      sede: ['', [Validators.required]], // Selector para sede
      facultad: ['', [Validators.required]], // Selector para facultad
      programa: ['', [Validators.required]] // Selector para programa
    });
  }

  setProgram(): void{
    this.loading = true;
    this.router.navigate(['/inf-general']);
  }

  nextFunction() {
   
  }
  
}

