import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ToastrModule } from 'ngx-toastr';

import { ConfigurationEstudianteModule } from './configuration-estudiante/configuration-estudiante.module';
import { PrincipalEstudianteComponent } from './principal-estudiante.component';


const routes = [
  {
    path: '',
    component: PrincipalEstudianteComponent,
  }
]

@NgModule({
  declarations: [PrincipalEstudianteComponent],
  imports: [CommonModule, ConfigurationEstudianteModule, RouterModule.forChild(routes)
],
  exports: [PrincipalEstudianteComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PrincipalEstudianteModule {}
