import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurationEstudianteModule } from './configuration-estudiante/configuration-estudiante.module';
import { PrincipalEstudianteComponent } from './principal-estudiante.component';
import { ProyectoGradoComponent } from './home-estudiante/modalidades-estudiante/proyecto-grado/proyecto-grado.component';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EstudiantesValidadosModalComponent } from './home-estudiante/modalidades-estudiante/proyecto-grado/estudiantes-validados-modal/estudiantes-validados-modal.component';
import { EstudiantesValidadosComponent } from './home-estudiante/modalidades-estudiante/proyecto-grado/estudiantes-validados-modal/estudiantes-validados/estudiantes-validados.component'

const routes = [
  {
    path: '',
    component: PrincipalEstudianteComponent,
  }
]

@NgModule({
  declarations: [PrincipalEstudianteComponent, ProyectoGradoComponent, EstudiantesValidadosModalComponent, EstudiantesValidadosComponent],
  imports: [BrowserAnimationsModule, NgbModule, ReactiveFormsModule, FormsModule, CommonModule, ConfigurationEstudianteModule, RouterModule.forChild(routes)
],
  exports: [PrincipalEstudianteComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PrincipalEstudianteModule {}
