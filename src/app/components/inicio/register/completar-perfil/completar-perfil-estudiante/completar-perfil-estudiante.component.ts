import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, concatMap, map, throwError } from 'rxjs';
import { Persona } from 'src/app/models/persona';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';
import { UserRegisterService } from 'src/app/services/user-register.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-completar-perfil-estudiante',
  templateUrl: './completar-perfil-estudiante.component.html',
  styleUrls: ['./completar-perfil-estudiante.component.css'],
})
export class CompletarPerfilEstudianteComponent implements OnInit {
  loading: boolean = false;
  programas: any[] = [];
  idUsuario: number = 0;
  isSelectedOption: string = 'editarPerfil'; // Opción por defecto seleccionada
  isSubMenuOpen: boolean = true; // Submenú desplegado por defecto
  studentProfile: FormGroup;

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private estudianteService: EstudianteService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private toastR: ToastrService,
    private usuarioService: UsuarioService
  ) {
    this.studentProfile = this.fb.group(
      {
        identificacion: [
          { disabled: true },
          [
            Validators.required,
            Validators.maxLength(10),
          ],
        ],
        primerNombre: ['', [Validators.required]],
        segundoNombre: ['', [Validators.required]],
        primerApellido: ['', [Validators.required]],
        segundoApellido: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        direccion: ['', [Validators.required]],
        idPrograma: ['', [Validators.required]],
      },
      {}
    );
  }

  ngOnInit(): void {
    // Llamada al servicio para obtener la lista de programas
    this.estudianteService.getListPrograms().subscribe((data: any[]) => {
      this.programas = data;
      console.log(this.programas);
    });

    //Obteniendo Id por token
    this.idUsuario = this.usuarioService.getTokenId()
    console.log("Este es el id del Token:"+ this.idUsuario);
    
    
    // Llamada a getUserStatus y llenado del formulario
    this.getUserStatus(this.idUsuario).subscribe(
      (userData: any) => {
        // Llena los campos del formulario con los valores obtenidos
        this.studentProfile.patchValue({
          identificacion: userData.identificacion,
          email: userData.email,
        });

        /*Desactiva la edición de los campos específicos del formulario
        this.studentProfile.get('identificacion')?.disable();
        this.studentProfile.get('email')?.disable();*/
      },
      (error) => {
        console.error('Error obteniendo detalles del usuario:', error);
      }
    );
  }



  getUserStatus(identificacion: number): Observable<any | []> {
    return this.loginService.getUserDetails(identificacion).pipe(
      map((response: any) => {
        const userData = {
          identificacion: response.identificacion,
          email: response.email.toLowerCase(),
        };
        console.log('User data:', userData); // Imprime el objeto en la consola
        return userData;
      }),
      catchError((error: any) => {
        console.error('Error obteniendo detalles del usuario:', error);
        return throwError(error);
      })
    );
  }

// Método de guardado de persona asincrónico
async savePersona(): Promise<void> {
  console.log(this.studentProfile);

  const infoPerson: Persona = {
    identificacion: this.studentProfile.value.identificacion,
    primerNombre: this.studentProfile.value.primerNombre,
    segundoNombre: this.studentProfile.value.segundoNombre,
    primerApellido: this.studentProfile.value.primerApellido,
    segundoApellido: this.studentProfile.value.segundoApellido,
    telefono: this.studentProfile.value.telefono,
    email: this.studentProfile.value.email,
    direccion: this.studentProfile.value.direccion,
  };

  this.loading = true;

  try {
    // Guardado de persona
    const data = await this.personaService.saveInfoPersona(infoPerson).toPromise();
    console.log("data de SaveInfoPersona " + data);
    this.toastR.success(
      'Información de persona guardada correctamente',
      'Guardado de persona'
    );
  } catch (error) {
    this.loading = false;
    console.error('Error al guardar datos de persona:', error);
    this.toastR.error('Error al guardar datos de persona', 'Error');
    this.studentProfile.reset();
  }
}


 
// Método de guardado estudiante asincrónico
async saveEstudiante(): Promise<void> {
  const infoStudent: Persona = {
    identificacion: this.studentProfile.value.identificacion,
    idPrograma: this.studentProfile.value.idPrograma,
  };

  try {
    // Guardado de estudiante
    const data = await this.estudianteService.saveInfoStudent(infoStudent).toPromise();
    console.log("data de saveInfoStudent " + data);
    this.toastR.success(
      'Información de estudiante guardada correctamente',
      'Guardado de estudiante'
    );
    this.router.navigate(['/programa']); //LLEVAR AQUI DONDE CORRESPONDA...
    this.loading = false;
  } catch (error) {
    this.loading = false;
    console.log(error);
    this.toastR.error('Error al guardar datos de estudiante', 'Error');
    this.studentProfile.reset();
  }
}

async saveProfileStudent(): Promise<void> {
  try {
    await this.savePersona();
    await this.saveEstudiante();
  } catch (error) {
    // Manejar errores generales si es necesario
    console.error('Error en el proceso de guardado:', error);
    this.toastR.error('Error en el proceso de guardado', 'Error');
    this.studentProfile.reset();
  } finally {
    this.loading = false; // Asegúrate de que el loading se actualice cuando todo el proceso sea exitoso o falle
  }
}
}
