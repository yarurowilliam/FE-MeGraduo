import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { DocentesService } from 'src/app/services/docentes.service';
import { Docente } from 'src/app/models/docenteFullInfo';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-docentes-validados',
  templateUrl: './docentes-validados.component.html',
  styleUrls: ['./docentes-validados.component.css']
})
export class DocentesValidadosComponent {
  docentes: Docente[];
  searchText: string;
  tokenIdUser: any;
  @Output() seleccionado = new EventEmitter<Docente>();
  constructor(private docenteService: DocentesService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.tokenIdUser = parseInt(this.usuarioService.getTokenId());
    this.getAll();
  }

  getAll() {
    //Recibir servicio de getListStudents y llenar la lista de this.estudiantes..
    this.docenteService.getAllTeachers().subscribe(
      res => {
        this.docentes = res;
        console.log(this.docentes);
      },
      err => console.log(err)
    )
  }

  seleccionar(docente: Docente) {
    this.seleccionado.emit(docente);
}

}


