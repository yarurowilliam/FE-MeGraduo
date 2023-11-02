import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitComponent } from './components/init/init.component';
import { GeneralInfoComponent } from './components/general-info/general-info.component';
import { SpecificInfoComponent } from './components/specific-info/specific-info.component';
import { GeneralInfoAddStudentComponent } from './components/general-info-add-student/general-info-add-student.component';
import { RegisterComponent } from './components/inicio/register/register.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { CompletarPerfilEstudianteComponent } from './components/inicio/register/completar-perfil/completar-perfil-estudiante/completar-perfil-estudiante.component';
import { CompletarPerfilDocenteComponent } from './components/inicio/register/completar-perfil/completar-perfil-docente/completar-perfil-docente.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { VerifyUserComponent } from './components/admin-panel/verify-user/verify-user.component';
import { VerifyStudentComponent } from './components/admin-panel/verify-user/verify-student/verify-student.component';
import { VerifyTeacherComponent } from './components/admin-panel/verify-user/verify-teacher/verify-teacher.component';
import { PlanteamientoComponent } from './components/planteamiento/planteamiento.component';
import { ObjetivosComponent } from './components/objetivos/objetivos.component';
import { AnexosComponent } from './components/anexos/anexos.component';
import { ProyectoGrado } from './models/uploadAnexos';
import { ProgramaComponent } from './components/programa/programa.component';
import { HomeComponent } from './components/principal/home/home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ConfigurationModule } from './components/principal/configuration/configuration.module';
import { DocentePanelComponent } from './components/docente-panel/docente-panel.component';
import { DocenteComponent } from './components/docente-panel/docente/docente.component';
import { DetalleProyectoComponent } from './components/proyectos/detalle-proyecto/detalle-proyecto.component';
import { DocenteComiteComponent } from './components/docente-panel/docente-comite/docente-comite.component';
import { DocenteDirectorComponent } from './components/docente-panel/docente-director/docente-director.component';
import { DetalleProyectoCalificacionesComponent } from './components/proyectos/detalle-proyecto/detalle-proyecto-calificaciones/detalle-proyecto-calificaciones.component';
import { DetalleProyectoComentariosComponent } from './components/proyectos/detalle-proyecto/detalle-proyecto-comentarios/detalle-proyecto-comentarios.component';
import { HomeEstudianteComponent } from './components/principal-estudiante/home-estudiante/home-estudiante.component';
import { PrincipalEstudianteComponent } from './components/principal-estudiante/principal-estudiante.component';
import { AuthGuard } from './helpers/auth.guard';
import { CommonModule } from '@angular/common';
import { ModalidadesEstudianteComponent } from './components/principal-estudiante/home-estudiante/modalidades-estudiante/modalidades-estudiante.component';
import { NotFound } from './components/principal/not-found/not-found.component';
import { PreregistroVerificarEstudianteComponent } from './components/principal-preregistro/preregistro-verificar-estudiante/preregistro-verificar-estudiante.component';
import { ProyectoGradoComponent } from './components/principal-estudiante/home-estudiante/modalidades-estudiante/proyecto-grado/proyecto-grado.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ProyectoGradoResolver } from './components/principal-estudiante/home-estudiante/modalidades-estudiante/proyecto-grado/proyecto-grado.resolver';
import { ConfirmarEmailComponent } from './components/vistas-confirmaciones/confirmar-email/confirmar-email.component';
import { ConfirmarProyectoComponent } from './components/vistas-confirmaciones/confirmar-proyecto/confirmar-proyecto.component';
import { GestionarRolesComponent } from './components/admin-panel/gestionar-roles/gestionar-roles.component';
import { VerProyectoGradoComponent } from './components/docente-panel/docente-comite/modalidades/ver-proyecto-grado/ver-proyecto-grado.component';
import { AnteproyectosFaseComponent } from './components/docente-panel/docente-comite/anteproyectos-fase/anteproyectos-fase.component';
import { VerAnteproyectoComponent } from './components/docente-panel/docente-comite/modalidades/ver-proyecto-grado/ver-anteproyecto/ver-anteproyecto.component';
import { DocenteAsesorComponent } from './components/docente-panel/docente-asesor/docente-asesor.component';



const routes: Routes = [
  
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'confirmar-email/:id', component: ConfirmarEmailComponent},
  {path: 'confirmar-propuesta/:idProyecto/:identificacion', component: ConfirmarProyectoComponent },
  {path: 'error', component: NotFound},
  {path: 'home', component: HomeComponent},
  {path: 'inicio', component: InitComponent },
  {path: 'programa', component: ProgramaComponent },
  {path: 'inf-general', component: GeneralInfoComponent},
  {path: 'inf-espcifica', component:SpecificInfoComponent},
  {path: 'inf-general_addUsers', component:GeneralInfoAddStudentComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'loading', component:LoadingComponent},
  {path: 'completar-perfil-student', component: CompletarPerfilEstudianteComponent},
  {path: 'completar-perfil-teacher', component: CompletarPerfilDocenteComponent},
  {path: 'profile', component: ProfilesComponent},
  {path: 'planteamiento', component: PlanteamientoComponent},
  {path: 'objetivos', component: ObjetivosComponent},
  {path: 'anexos', component: AnexosComponent},
  { path: 'detalle-proyecto/:id', component: DetalleProyectoComponent },
  { path: 'calificaciones', component: DetalleProyectoCalificacionesComponent },
  { path: 'comentarios', component: DetalleProyectoComentariosComponent },
  { path: 'pendiente-verificacion', component: PreregistroVerificarEstudianteComponent},


  { path: 'home-estudiantes', component: PrincipalEstudianteComponent, canActivate:[AuthGuard],data: { role: 'ESTUDIANTE' } ,children: [
    { path: '', component: HomeEstudianteComponent},
    { path: 'modalidades-disponibles', component: ModalidadesEstudianteComponent},
    { path: 'proyecto-grado', component: ProyectoGradoComponent, resolve: { proyectoGradoData: ProyectoGradoResolver }},
  ]},

  
  { path: 'admin-panel', component: AdminPanelComponent, /*canActivate:[AuthGuard],*/ children: [
    { path: '', component: VerifyUserComponent},
    { path: 'verify-user', component: VerifyUserComponent},
    { path: 'register',component: RegisterComponent },
    { path: 'verifyStudent',component: VerifyStudentComponent },
    { path: 'verifyTeacher',component: VerifyTeacherComponent},
    { path: 'gestionar-roles', component: GestionarRolesComponent}
    
  ]},
  { path: 'docente-panel', component: DocentePanelComponent, /*canActivate:[AuthGuard],*/ children: [
    { path: '', component: DocenteComponent},
    { path: 'blank', component: LoadingComponent},
    { path: 'docente-view', component: DocenteComponent},
    { path: 'docente-comite',component: DocenteComiteComponent},
    { path: 'docente-comite/anteproyectos',component: AnteproyectosFaseComponent},
    { path: 'docente-asesor',component: DocenteAsesorComponent},
    { path: 'docente-director',component: DocenteDirectorComponent},    
    { path: 'ver-proyecto/:id', component: VerProyectoGradoComponent},
    { path: 'ver-anteproyecto/:id', component: VerAnteproyectoComponent},
    
  ]},
  {path: '**', component: NotFound}
];

@NgModule({
  imports: [CommonModule, ConfigurationModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppRoutingModule { }
