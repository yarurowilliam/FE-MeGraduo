import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProgramaComponent } from './components/programa/programa.component';
import { GeneralInfoComponent } from './components/general-info/general-info.component';
import { InitComponent } from './components/init/init.component';
import { SpecificInfoComponent } from './components/specific-info/specific-info.component';
import { GeneralInfoAddStudentComponent } from './components/general-info-add-student/general-info-add-student.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { RegisterComponent } from './components/inicio/register/register.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { CompletarPerfilComponent } from './components/inicio/register/completar-perfil/completar-perfil.component';
import { CompletarPerfilDocenteComponent } from './components/inicio/register/completar-perfil/completar-perfil-docente/completar-perfil-docente.component';
import { CompletarPerfilEstudianteComponent } from './components/inicio/register/completar-perfil/completar-perfil-estudiante/completar-perfil-estudiante.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { VerifyUserComponent } from './components/admin-panel/verify-user/verify-user.component';
import { ManageUserComponent } from './components/admin-panel/manage-user/manage-user.component';
import { FiltroEmailPipe } from './pipes/filtro-email.pipe';
import { VerifyStudentComponent } from './components/admin-panel/verify-user/verify-student/verify-student.component';
import { VerifyTeacherComponent } from './components/admin-panel/verify-user/verify-teacher/verify-teacher.component';
import { PlanteamientoComponent } from './components/planteamiento/planteamiento.component';
import { ObjetivosComponent } from './components/objetivos/objetivos.component';
import { AnexosComponent } from './components/anexos/anexos.component';
import { DocentePanelComponent } from './components/docente-panel/docente-panel.component';
import { DocenteComponent } from './components/docente-panel/docente/docente.component';
import { DocenteComiteComponent } from './components/docente-panel/docente-comite/docente-comite.component';
import { DocenteDirectorComponent } from './components/docente-panel/docente-director/docente-director.component';
import { DocenteAsesorComponent } from './components/docente-panel/docente-asesor/docente-asesor.component';
import { DocenteJuradoComponent } from './components/docente-panel/docente-jurado/docente-jurado.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { DetalleProyectoComponent } from './components/proyectos/detalle-proyecto/detalle-proyecto.component';
import { DetalleProyectoComentariosComponent } from './components/proyectos/detalle-proyecto/detalle-proyecto-comentarios/detalle-proyecto-comentarios.component';
import { DetalleProyectoCalificacionesComponent } from './components/proyectos/detalle-proyecto/detalle-proyecto-calificaciones/detalle-proyecto-calificaciones.component';
import { ConfigurationModule } from './components/principal/configuration/configuration.module';
import { ConfigurationEstudianteModule } from './components/principal-estudiante/configuration-estudiante/configuration-estudiante.module';
import { HomeEstudianteComponent } from './components/principal-estudiante/home-estudiante/home-estudiante.component';
import { PreregistroVerificarEstudianteComponent } from './components/principal-preregistro/preregistro-verificar-estudiante/preregistro-verificar-estudiante.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes = [
  {
    path: 'inicio',
    loadChildren: () =>
      import('./components/principal/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'principal-estudiante',
    loadChildren: () =>
      import('./components/principal-estudiante/principal-estudiante.module').then((m) => m.PrincipalEstudianteModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./components/principal/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProgramaComponent,
    GeneralInfoComponent,
    InitComponent,
    SpecificInfoComponent,
    GeneralInfoAddStudentComponent,
    InicioComponent,
    LoginComponent,
    RegisterComponent,
    LoadingComponent,
    CompletarPerfilComponent,
    CompletarPerfilDocenteComponent,
    CompletarPerfilEstudianteComponent,
    AdminPanelComponent,
    VerifyUserComponent,
    ManageUserComponent,
    VerifyStudentComponent,
    VerifyTeacherComponent,
    FiltroEmailPipe,
    PlanteamientoComponent,
    ObjetivosComponent,
    AnexosComponent,
    DocentePanelComponent,
    DocenteComponent,
    DocenteComiteComponent,
    DocenteDirectorComponent,
    DocenteAsesorComponent,
    DocenteJuradoComponent,
    ProyectosComponent,
    DetalleProyectoComponent,
    DetalleProyectoComentariosComponent,
    DetalleProyectoCalificacionesComponent,
    HomeEstudianteComponent,
    PreregistroVerificarEstudianteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-container', // Asegúrate de que se refiere al estilo CSS que has añadido
    }),
    HttpClientModule,
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    ConfigurationModule,
    ConfigurationEstudianteModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
