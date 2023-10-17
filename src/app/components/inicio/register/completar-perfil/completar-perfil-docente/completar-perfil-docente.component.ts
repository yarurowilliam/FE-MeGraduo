import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Persona } from 'src/app/models/persona';
import { DocentesService } from 'src/app/services/docentes.service';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Docente } from 'src/app/models/docenteFullInfo';

@Component({
  selector: 'app-completar-perfil-docente',
  templateUrl: './completar-perfil-docente.component.html',
  styleUrls: ['./completar-perfil-docente.component.css'],
})
export class CompletarPerfilDocenteComponent {
  loading: boolean = false;
  isSelectedOption: string = 'editarPerfil'; // Opción por defecto seleccionada
  isSubMenuOpen: boolean = true; // Submenú desplegado por defecto
  programas: any[] = [];
  teacherProfile: FormGroup;
  idUsuario: number = 0;
  

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private docenteService: DocentesService
  ) {
    this.teacherProfile = this.fb.group(
      {
        identificacion: [
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(10),
          ],
        ],
        primerNombre: ['', [Validators.required]],
        segundoNombre: [''],
        primerApellido: ['', [Validators.required]],
        segundoApellido: [''],
        telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        email: ['', [Validators.required, Validators.email]],
        direccion: ['', [Validators.required]],
        idPrograma: ['', [Validators.required]],
      },
      {}
    );
  }

  ngOnInit(): void {
    // Llamada al servicio para obtener la lista de programas
    this.docenteService.getListPrograms().subscribe((data: any[]) => {
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
    this.teacherProfile.patchValue({
      identificacion: userData.identificacion,
      email: userData.email,
    });
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
  console.log(this.teacherProfile);

  const infoPerson: Persona = {
    identificacion: this.teacherProfile.value.identificacion,
    primerNombre: this.teacherProfile.value.primerNombre,
    segundoNombre: this.teacherProfile.value.segundoNombre,
    primerApellido: this.teacherProfile.value.primerApellido,
    segundoApellido: this.teacherProfile.value.segundoApellido,
    telefono: this.teacherProfile.value.telefono,
    email: this.teacherProfile.value.email,
    direccion: this.teacherProfile.value.direccion,
  };

  this.loading = true;

  try {
    // Guardado de persona
    const data = await this.personaService.saveInfoPersona(infoPerson).toPromise();
    console.log("data de SaveInfoPersona " + data);
    this.toastr.success(
      'Información de persona guardada correctamente',
      'Guardado de persona'
    );
  } catch (error) {
    this.loading = false;
    console.error('Error al guardar datos de persona:', error);
    this.toastr.error('Error al guardar datos de persona', 'Error');
    this.teacherProfile.reset();
  }
}

// Método de guardado docente asincrónico
async saveDocente(): Promise<void> {
  const infoDocente: Persona = {
    identificacion: this.teacherProfile.value.identificacion,
    idPrograma: this.teacherProfile.value.idPrograma,
  };

  try {
    // Guardado de docente
    const data = await this.docenteService.saveInfoTeacher(infoDocente).toPromise();
    console.log("data de saveinfoDocente " + data);
    this.toastr.success(
      'Información de docente guardada correctamente',
      'Guardado de docente'
    );
    this.router.navigate(['/docente-panel']); //LLEVAR AQUI DONDE CORRESPONDA...
    this.loading = false;
  } catch (error) {
    this.loading = false;
    console.log(error);
    this.toastr.error('Error al guardar datos de docente', 'Error');
    this.teacherProfile.reset();
  }
}

  //Metodo perfil de teacher guardar
  async saveProfileTeacher(): Promise<void> {
    try {
      await this.savePersona();
      await this.saveDocente();
    } catch (error) {
      // Manejar errores generales si es necesario
      console.error('Error en el proceso de guardado:', error);
      this.toastr.error('Error en el proceso de guardado', 'Error');
      this.teacherProfile.reset();
    } finally {
      this.loading = false; // Asegúrate de que el loading se actualice cuando todo el proceso sea exitoso o falle
    }
  }
  

  logOut() {
    this.loginService.removeLocalStorge();
    this.router.navigate(['/login']);
    this.toastr.warning(
      'Gracias por utilizar nuestros servicios',
      'Sesion finalizada'
    );
    console.clear()
  }
}
