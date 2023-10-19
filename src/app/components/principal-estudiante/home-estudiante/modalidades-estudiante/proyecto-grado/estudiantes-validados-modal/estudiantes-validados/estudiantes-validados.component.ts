import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { EstudianteService } from 'src/app/services/estudiante.service'
import { Estudiante } from 'src/app/models/estudianteFullInfo';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-estudiantes-validados',
  templateUrl: './estudiantes-validados.component.html',
  styleUrls: ['./estudiantes-validados.component.css']
})
export class EstudiantesValidadosComponent implements OnInit {
  estudiantes: Estudiante[];
  searchText: string;
  tokenIdUser: any;
  @Output() seleccionado = new EventEmitter<Estudiante>();
  constructor(private estudianteService: EstudianteService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.tokenIdUser = parseInt(this.usuarioService.getTokenId());
    this.getAll();
  }

  getAll() {
    //Recibir servicio de getListStudents y llenar la lista de this.estudiantes..
    this.estudianteService.getListStudents(this.tokenIdUser).subscribe(
      res => {
        this.estudiantes = res;
        console.log(this.estudiantes);
      },
      err => console.log(err)
    )
  }

  seleccionar(estudiante: Estudiante) {
    this.seleccionado.emit(estudiante);
}

}
