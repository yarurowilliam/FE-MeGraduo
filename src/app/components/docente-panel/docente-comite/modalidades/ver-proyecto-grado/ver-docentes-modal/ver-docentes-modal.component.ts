import { Component } from '@angular/core';
import { Docente } from 'src/app/models/docenteFullInfo';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ver-docentes-modal',
  templateUrl: './ver-docentes-modal.component.html',
  styleUrls: ['./ver-docentes-modal.component.css']
})
export class VerDocentesModalComponent {
  constructor(public activeModal: NgbActiveModal) { }

  actualizar(docente: Docente) {
    this.activeModal.close(docente);
  }
}
