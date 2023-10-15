import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ConfigurationModule } from '../configuration/configuration.module'
import { NotFound } from './not-found.component'


const routes = [
  {
    path: '',
    component: NotFound,
  },
]

@NgModule({
  declarations: [NotFound],
  imports: [CommonModule, ConfigurationModule, RouterModule.forChild(routes)],
  exports: [NotFound],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NotFoundModule {}