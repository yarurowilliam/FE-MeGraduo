import { Pipe, PipeTransform } from '@angular/core';
import { Estudiante } from '../models/estudianteFullInfo';

@Pipe({
  name: 'filtroEstudiante'
})
export class FiltroEstudiantePipe implements PipeTransform {

    transform(estudiantes: Estudiante[], searchText: string) {
        if (searchText == null) return estudiantes;
        return estudiantes.filter(estudiante =>
                estudiante.identificacion.toString().indexOf(searchText.toLowerCase()) !== -1
                ||
                estudiante.primerNombre.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
                ||
                estudiante.primerApellido.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        );
    }

}
