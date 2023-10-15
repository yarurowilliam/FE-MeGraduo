import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { NavstudentComponent } from './navstudent/navstudent.component';
import { SidebarComponent } from './sidebar/sidebar.component'


@NgModule({
  declarations: [
    NavstudentComponent,
    SidebarComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    NavstudentComponent,
    SidebarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConfigurationEstudianteModule { }
