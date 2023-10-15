import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/models/persona';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-completar-perfil-docente',
  templateUrl: './completar-perfil-docente.component.html',
  styleUrls: ['./completar-perfil-docente.component.css']
})
export class CompletarPerfilDocenteComponent {
  loading: boolean = false;
  email: string = "admin@admin.com";
  roles: string[] =["Docente orientador", "Docente revisor", "Docente supervisor"];
  approbedCredits: number = 100;
  status: string = '';
  modGrade: string = '';
  numIdentification: number = 1010010011;
  
  isSelectedOption: string = 'editarPerfil'; // Opción por defecto seleccionada
  isSubMenuOpen: boolean = true; // Submenú desplegado por defecto 
  teacherProfile: FormGroup;
  


  typeId= [
    { nombre: "CC" },
    { nombre: "TI" },
    { nombre: "DNI" },
    { nombre: "PT" },
  ];


  constructor(private fb: FormBuilder, 
    private personaService: PersonaService,
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService){

      this.teacherProfile = this.fb.group({
        //typeIdentificacion: ['', [Validators.required]],
        identification: [{value: this.numIdentification, disabled:true}, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
        firstName: [ '', [Validators.required]],
        secondName: ['', [Validators.required]],
        fisrtLastName: [ '', [Validators.required]],
        secondLastName: ['', [Validators.required]],
        //birthday: ['', [Validators.required,  this.birthdayValidator]],
        cellphone: [ '', [Validators.required, Validators.maxLength(10)]],
        email: [{ value: this.email, disabled: true }, [Validators.required, Validators.pattern(/^\d{10}$/)]],
        direction: [ '', [Validators.required, Validators.maxLength(50)]],
        role: [{value: this.roles, disabled:true}, [Validators.required]],
        modGrade: [ {value: this.modGrade, disabled:true}],
        approbedCredits: [{value: this.approbedCredits, disabled:true}],
        status: [{value: this.status, disabled:true}],
      }, {});
  }

  ngOnInit(): void {
   

  }


  
  birthdayValidator(control: FormControl): { [key: string]: any } | null {
    if (control.value) {
      const currentDate = new Date();
      const selectedDate = new Date(control.value);
      const yearsDifference = currentDate.getFullYear() - selectedDate.getFullYear();
      
      if (yearsDifference < 16) {
        return { 'tooYoung': true };
      }
    }
    return null;
  }
  

  //Metodo perfil de teacher guardar
  saveProfileTeacher(): void {
    
  }

  logOut(){
    this.loginService.removeLocalStorge();
    this.router.navigate(['/login']);
    this.toastr.warning('Gracias por utilizar nuestros servicios', 'Sesion finalizada');
  }

}
