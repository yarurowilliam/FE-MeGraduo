import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ConfigurationModule } from '../configuration/configuration.module'
import { HomeComponent } from './home.component'


const routes = [
  {
    path: '',
    component: HomeComponent,
  },
]

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, ConfigurationModule, RouterModule.forChild(routes)],
  exports: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
