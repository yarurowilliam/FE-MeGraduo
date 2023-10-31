import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Estudiante } from 'src/app/models/estudianteFullInfo';
import { Persona } from 'src/app/models/persona';
import { DocentesService } from 'src/app/services/docentes.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ChangeDetectorRef } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-gestionar-roles',
  templateUrl: './gestionar-roles.component.html',
  styleUrls: ['./gestionar-roles.component.css']
})
export class GestionarRolesComponent {
  form: FormGroup;
  modalOpen = false;
  modalVerifyStudent: FormGroup;
  modalVerifyTeacher: FormGroup;
  selectedStudent: any;
  selectedTeacher: any;
  estudiantes: any[] = [];
  docentes: any[] = [];
  roles: string[] = [];
  selectedRoles: string[] = [];
  id: number = 1;
  loading = false;
  tempDocenteRoles: string[] = [];
  docenteID: number | any;
  rolesAsignadosDocente: string =''
  estado: string;


  tableComponent: { nombre: string }[] = [
    { nombre: 'Nombre' },
    { nombre: 'Identificación' },
    { nombre: 'Programa Académico' },
    { nombre: 'Correo electrónico' },
    { nombre: 'Verificacion' },
  ];
  


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private estudianteService: EstudianteService,
    private docenteService: DocentesService,
    private usuarioService: UsuarioService,
    private toastR: ToastrService,
    private cdRef: ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({});

    this.modalVerifyStudent = this.formBuilder.group({
      identificacion: [ '' ],
      primerNombre: [''],
      segundoNombre: [''],
      primerApellido: [''],
      segundoApellido: [''],
      email: [''],
      creditosAprobados: ['', [Validators.required]],
    });

    this.modalVerifyTeacher = this.formBuilder.group({
      identificacion: [''],
      primerNombre: [''],
      segundoNombre: [''],
      primerApellido: [''],
      segundoApellido: [''],
      email: [''],
      enfasis: [''],
      roleSelected: [''],
        
      
    });
    
  }

  ngOnInit(): void {
    this.loadDocentes()
    this.getAllRoles()
  }


async loadDocentes(){
  try {
    // Llama al servicio para obtener la lista de docentes. Asumiendo que tienes el ID requerido.
    this.docentes = await this.docenteService.getAllTeachers().toPromise();

    // Obtener un arreglo de observables que devuelvan el nombre del programa para cada estudiante
    const observablesDoc = this.docentes.map(docente => this.programa(docente.idPrograma));

    const nombresProgramaDoc = await forkJoin(observablesDoc).toPromise();

    this.docentes.forEach((docente, index) => {
      docente.nombrePrograma = nombresProgramaDoc[index];
    });
  } catch (error) {
    console.error("Error al cargar docentes:", error);
  }
}  

programa(idPrograma: number) {
  return this.docenteService.getListPrograms().pipe(
    map((data: any[]) => {
      const programaEncontrado = data.find(programa => programa.id === idPrograma);
      if (programaEncontrado) {
        return programaEncontrado.nombrePrograma;
      } else {
        console.log("Programa no encontrado para el idPrograma: " + idPrograma);
        return "Programa no encontrado"; // Otra acción de manejo de errores
      }
    })
  );
}

getRoleAsignado(docenteId: number) {
  this.loginService.getRole(docenteId)
    .pipe(
      catchError((error: any) => {
        console.error('Error al obtener los roles:', error);
        // Realiza la acción correspondiente en caso de error, por ejemplo, mostrar un mensaje de error
        return throwError(error);
      })
    )
    .subscribe((roles: any[]) => {
      if (roles && roles.length > 0) {
        const rolesAsignados = roles.map(role => role.rolName);
        this.tempDocenteRoles = rolesAsignados;
        console.log("Roles obtenidos:", this.tempDocenteRoles);
        this.rolesAsignadosDocente = this.tempDocenteRoles.join(', ');
        
        // Llama a filtro después de obtener los roles
        this.filtro();
      } else {
        console.log("Roles no encontrados para el docenteId: " + this.rolesAsignadosDocente);
        // Realiza la acción correspondiente en caso de error
      }
    });
}

getAllRoles() {
  this.loginService.getListRoles().subscribe(
    (data: any[]) => {
      this.roles = data.map(role => role.nombreRol);
    },
    (error) => {
      console.error('Error al obtener roles:', error);
    }
  );
  
}

async cargarRolesYFiltrar() {
  await this.getRoleAsignado(this.docenteID); // Espera a que se carguen los roles del docente
  this.filtro(); // Luego aplica el filtro
}

filtro(): void {
  console.log("Estos son los roles temp:"+ this.tempDocenteRoles);
  // Filtra los roles que están en this.roles pero no en this.tempDocenteRoles
  this.roles = this.roles.filter(role => !this.tempDocenteRoles.includes(role));
  console.log("Estos son los roles:"+ this.roles);
}

async agregarRoles() {
  const nombreRol = this.modalVerifyTeacher.get('roleSelected').value;
  console.log('Rol seleccionado por el usuario en agregarRoles:', nombreRol);
  this.docenteID = this.modalVerifyTeacher.get('identificacion').value;
  console.log("docenteIDD:" + this.docenteID);

  if (!nombreRol) {
    console.error('No se ha seleccionado un rol.');
    // Muestra un mensaje de error o realiza alguna acción si no se selecciona un rol.
    return;
  }

  if (!this.docenteID) {
    console.error('No se ha encontrado el docente ID.');
    // Muestra un mensaje de error o realiza alguna acción si no se obtiene un docente ID.
    return;
  }

  try {
    // Llama al servicio para asignar el rol y espera la respuesta
    const response = await this.usuarioService.asignarRol(this.docenteID, nombreRol).toPromise();

    console.log('Rol asignado con éxito:', response);

    // Después de asignar el rol, actualiza los roles disponibles y asignados
    this.getAllRoles();
    this.cargarRolesYFiltrar();
  } catch (error) {
    // Maneja el error si algo sale mal
    console.error('Error al asignar el rol:', error);
    // Puedes mostrar un mensaje de error aquí si lo deseas
  }
}

onTeacherSelection(teacher: any) {
  this.selectedTeacher = teacher;
  console.log("Docente seleccionado:");
  console.log("Nombre: " + this.selectedTeacher.primerNombre);
  console.log("Identificación: " + this.selectedTeacher.identificacion);
  // Agrega más propiedades según tus necesidades
  this.docenteID = this.selectedTeacher.identificacion;
  this.setValuesTeacherSelected(this.selectedTeacher);
  this.getRoleAsignado(this.docenteID);

}

  setValuesTeacherSelected(teacher: any):void{
    this.modalVerifyTeacher.setValue({
      identificacion: teacher.identificacion,
      primerNombre: teacher.primerNombre,
      segundoNombre: teacher.segundoNombre,
      primerApellido: teacher.primerApellido,
      segundoApellido: teacher.segundoApellido,
      email: teacher.email,
      enfasis: teacher.enfasis,
      roleSelected: ''
    });
    this.estado = teacher.estadoUsuario;
    console.log("Estado: "+ this.estado)
  }

  abrirModalTeacher():void{
    $("#modalAddDocente").modal('show');
  }

  cerrarModalTeacher():void{
    $("#modalAddDocente").modal('hide');
  }
}
