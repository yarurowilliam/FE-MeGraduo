import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProyectoGrado } from 'src/app/models/uploadAnexos';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-anexos',
  templateUrl: './anexos.component.html',
  styleUrls: ['./anexos.component.css']
})
export class AnexosComponent {
  tittle8 = "8. ADJUNTAR DOCUMENTOS DOCUMENTOS";
  responseMessage: string = ''
  loading = false;
  uploadForm: FormGroup;  
  toastR: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private proyectoService: ProyectoService) {
    this.uploadForm = this.formBuilder.group({
      fileInput: ['', [Validators.required]],
      
    });
  

    
  }

fileValidator() {
    return (control: any) => {
      const file = control.value;
      if (file) {
        const allowedExtensions = ['pdf'];
        const extension = file.name.split('.').pop().toLowerCase();

        if (allowedExtensions.indexOf(extension) === -1) {
          return { invalidExtension: true };
        }
      }

      return null;
    };
  }

  uploadFormSave():void{
    
  }

/*
  uploadFormSave(): void {
    console.log(this.uploadForm);

    const file: ProyectoGrado = {
      file: this.uploadForm.value.file,
      
    };

    this.loading = true;
    
    this.proyectoService.uploadData(file).subscribe((data) => {
      console.log(data);
      this.toastR.success("Archivo guardado exitosanente", "Anexo Cargado");
      this.router.navigate(['/programa']);
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error);
      this.toastR.error(error.error.message, "Error cargar archivo!");
      this.uploadForm.reset();
    });
  }
*/


  
}
