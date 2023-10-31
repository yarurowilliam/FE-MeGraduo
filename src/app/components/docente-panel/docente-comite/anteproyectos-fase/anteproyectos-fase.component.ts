import { Component } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-anteproyectos-fase',
  templateUrl: './anteproyectos-fase.component.html',
  styleUrls: ['./anteproyectos-fase.component.css']
})
export class AnteproyectosFaseComponent {
  listProyectos: any[] = [];
  selectedProyect: any;
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
        this.listProyectos = data.filter((proyecto: any) => proyecto.estadoProyecto != " ");
        this.totalItems = this.listProyectos.length; // Actualizar el total de elementos
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
}