import { Component } from '@angular/core';
import { Estudiante } from 'src/app/models/estudianteFullInfo';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-estudiantes-validados-modal',
  templateUrl: './estudiantes-validados-modal.component.html',
  styleUrls: ['./estudiantes-validados-modal.component.css']
})
export class EstudiantesValidadosModalComponent {
  constructor(public activeModal: NgbActiveModal) { }

  actualizarEstudiante(estudiante: Estudiante) {
    this.activeModal.close(estudiante);
  }
}
