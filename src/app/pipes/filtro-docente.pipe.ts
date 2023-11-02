import { Pipe, PipeTransform } from '@angular/core';
import { Docente } from '../models/docenteFullInfo';

@Pipe({
    name: 'filtroDocente'
  })
  export class FiltroDocentePipe implements PipeTransform {
  
      transform(items: any[], searchText: string): any[] {
        if (!items || !searchText) {
            return items;
          }  
          
          searchText = searchText.toString();

      

        const filteredItems = items.filter(item => {
            return (
              (item.idDirector?.toString()?.includes(searchText)) ||
              (item.idIntegrante1?.toString()?.includes(searchText)) ||
              (item.idIntegrante2?.toString()?.includes(searchText)) ||
              (item.idIntegrante3?.toString()?.includes(searchText))
            );
          });
    
    // Si no hay resultados, devuelve un array con un objeto que indica "No hay resultados"
      return filteredItems.length > 0 ? filteredItems : [{ noResults: true }];
        }
  }

