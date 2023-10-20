import { Component, ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Docente } from 'src/app/models/docenteFullInfo';
import { Estudiante } from 'src/app/models/estudianteFullInfo';
import { DocentesService } from 'src/app/services/docentes.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent {
  @ViewChild('emailSpan') emailSpan: ElementRef;
  @ViewChild('userSpan') userSpan: ElementRef;
  
  loading: boolean = false;
  isSelectedOption: string = 'miPerfil'; // Opción por defecto seleccionada
  isSubMenuOpen: boolean = true; // Submenú desplegado por defecto
  docente: Docente; 
  estudiante: Estudiante;
  programas: [] | any;
  idUsuario: number = 0;
  profileForm: FormGroup;
  role: string = ''

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private docenteService: DocentesService,
    private estudianteService: EstudianteService
  ) {
    this.profileForm = this.fb.group({
      nombres: [''],
      apellidos: [''],
      telefono: [''],
      direccion: [''],
      programa: [''],
      enfasis: ['']

    });
    
  }

  ngOnInit(): void {
   
    //Obteniendo Id por token
    this.idUsuario = this.usuarioService.getTokenId()
    console.log("Este es el id del Token:"+ this.idUsuario);
   //Obteniendo role por localStorage
    this.role = this.loginService.getRoleLocalStorage()
    console.log("este es el rol:"+ this.role)

   
    if(this.role=== 'DOCENTE'){
      this.isDocente()
    }else if (this.role === 'ESTUDIANTE'){
      this.isEstudiante()
    }else{
      console.log("No hay rol")
    }
    
  }

  

  programa(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let idPrograma;
  
      if (this.role === "DOCENTE") {
        idPrograma = this.docente.idPrograma;
      } else if (this.role === "ESTUDIANTE") {
        idPrograma = this.estudiante.idPrograma;
      } else {
        reject("Rol no válido");
        return;
      }
  
      this.docenteService.getListPrograms().subscribe((data: any[]) => {
        const programaEncontrado = data.find(programa => programa.id === idPrograma);
  
        if (programaEncontrado) {
          resolve(programaEncontrado.nombrePrograma);
        } else {
          console.log("Programa no encontrado para el idPrograma: " + idPrograma);
          reject("Programa no encontrado");
        }
      });
    });
  }
  

  async isDocente(): Promise<void> {
    this.docenteService.getFullInfoDocente(this.idUsuario).subscribe(async (data: Docente) => {
      this.docente = data;
      console.log("Esta es la data: " + this.docente.primerNombre);
  
      const nombrePrograma = await this.programa();
  
      this.profileForm.patchValue({
        nombres: this.docente.primerNombre + ' ' + this.docente.segundoNombre,
        apellidos: this.docente.primerApellido + ' ' + this.docente.segundoApellido,
        telefono: this.docente.telefono,
        direccion: this.docente.direccion,
        programa: nombrePrograma,
        enfasis: this.docente.enfasis,
        
      });
      this.emailSpan.nativeElement.textContent = this.docente.email; 
      this.userSpan.nativeElement.textContent = this.docente.primerNombre; 
      

    });
  }

  async isEstudiante(): Promise<void> {
    this.estudianteService.getFullInfoEstudiante(this.idUsuario).subscribe(async (data: Estudiante) => {
      this.estudiante = data;
      console.log("Esta es la data: " + this.estudiante.primerNombre);
  
      const nombrePrograma = await this.programa();
  
      this.profileForm.patchValue({
        nombres: this.estudiante.primerNombre + ' ' + this.estudiante.segundoNombre,
        apellidos: this.estudiante.primerApellido + ' ' + this.estudiante.segundoApellido,
        telefono: this.estudiante.telefono,
        direccion: this.estudiante.direccion,
        programa: nombrePrograma,
      });
      this.emailSpan.nativeElement.textContent = this.estudiante.email; 
      this.userSpan.nativeElement.textContent = this.estudiante.primerNombre;
    });
  }

 irProyectos(){
  if(this.role === "DOCENTE"){
    this.router.navigate(['/docente-panel'])
  }else if(this.role === "ESTUDIANTE"){
    this.router.navigate(['/home-estudiantes/modalidades-disponibles'])
  }else{
    this.router.navigate(['/NotFound'])
  }
 }


  logOut(): void {
    this.loginService.removeLocalStorge();
    this.router.navigate(['/login']);
    this.toastr.warning(
      'Gracias por utilizar nuestros servicios',
      'Sesion finalizada'
    );
    console.clear()
  }
}
