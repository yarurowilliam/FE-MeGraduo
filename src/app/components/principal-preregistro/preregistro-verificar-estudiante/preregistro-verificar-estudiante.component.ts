import { Component } from '@angular/core'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-preregistro-verificar-estudiante',
  templateUrl: './preregistro-verificar-estudiante.component.html',
  styleUrls: ['./preregistro-verificar-estudiante.component.css']
})
export class PreregistroVerificarEstudianteComponent {
  constructor(private title: Title) {
    this.title.setTitle('MG-100 - Pendiente de Verificacion')
  }

  clickRegresarInicio(): void {
    window.location.href = '/'
  }
}
