import { Component } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { FiltroDocentePipe } from 'src/app/pipes/filtro-docente.pipe';

@Component({
  selector: 'app-proyecto-fase',
  templateUrl: './proyecto-fase.component.html',
  styleUrls: ['./proyecto-fase.component.css']
})
export class ProyectoFaseComponent {
  listProyectos: any[] = [];
  selectedProyect: any;
  searchText: string = '';
  orderBy: string = 'asc';
  sortKey: string = '';
  tittle1 = "PROYECTOS EN ESTADO DE 'ANTEPROYECTOS'";
  tableComponent: { nombre: string }[] = [
    { nombre: "Título del proyecto" },
    { nombre: "Facultad" },
    { nombre: "Integrantes" },
    { nombre: "Director del proyecto" },
    { nombre: "Fecha de creación" },
    { nombre: "" },
  ];

  // Configuración de paginación
  p: number = 1; // Página actual
  itemsPerPage: number = 10; // Cantidad de elementos por página (valor predeterminado)
  totalItems: number = 0; // Total de elementos
  pagedProyectos: any[] = []; // Lista paginada
  totalPages: number | any;

  constructor(
    private proyectoServide: ProyectoService // Inyecta tu servicio aquí
  ) {}

  ngOnInit() {
     // Llamar al servicio para obtener los proyectos
     this.proyectoServide.getAllProyectos().subscribe(
      (data: any) => {
        // Filtrar los proyectos con estado "finalizado y en curso"
        this.listProyectos = data.filter((proyecto: any) => proyecto.tipoFase === "PROYECTO");
        this.totalItems = this.listProyectos.length; // Actualizar el total de elementos
        console.log("Listado de proyectos: ", this.listProyectos);
        
        this.calcularTotalPaginas();
        this.paginarProyectos();
      },
      (error) => {
        console.error('Error al cargar proyectos:', error);
      }
    );
  }

  verInformacion(proyecto: any) {
    // Abre una nueva ventana o pestaña con la información detallada
    window.open(`/ruta-a-la-información-detallada/${proyecto.id}`, '_blank');
  }

  // Método para manejar cambios de página
  pageChanged(event: any) {
    this.p = event;
    this.paginarProyectos();
  }

  calcularTotalPaginas() {
    this.totalItems = this.listProyectos.length;
    const totalPagesFloat = this.totalItems / this.itemsPerPage;
    this.totalPages = Math.ceil(totalPagesFloat);
  }

  paginarProyectos() {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    this.pagedProyectos = this.listProyectos.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Método para habilitar Previous y Next
  canShowPrevious(): boolean {
    return this.p > 1;
  }

  canShowNext(): boolean {
    // El botón "Next" se habilita si hay más elementos por mostrar en la siguiente página
    return (this.p * this.itemsPerPage) < this.totalItems;
  }

  sortBy(key: string): void {
    if (this.sortKey === key) {
      this.orderBy = this.orderBy === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.orderBy = 'asc';
    }
    this.listProyectos = this.sortTable(
      this.listProyectos,
      this.sortKey,
      this.orderBy
    );
  }

  sortTable(data: any[], key: string, order: string): any[] {
    return data.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];
      if (order === 'asc') {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });
  }
}

