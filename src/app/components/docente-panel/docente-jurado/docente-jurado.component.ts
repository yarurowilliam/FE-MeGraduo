import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Observable, catchError, map, throwError } from 'rxjs';
import { DocentesService } from 'src/app/services/docentes.service';
import { LoginService } from 'src/app/services/login.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-docente-jurado',
  templateUrl: './docente-jurado.component.html',
  styleUrls: ['./docente-jurado.component.css']
})
export class DocenteJuradoComponent {
  listProyectos: any[] = [];
  selectedProyect: any;
  tittle1 = 'INFORMACIÓN GENERAL DE PROYECTOS';
  isSelectedOption: string = '';
  tableComponent: { nombre: string }[] = [
    { nombre: 'Título del proyecto' },
    { nombre: 'Facultad' },
    { nombre: 'Integrantes' },
    { nombre: 'Director del proyecto' },
    { nombre: 'Estado'},
    { nombre: 'Fecha de creación' },
    { nombre: '' },
  ];

  // Configuración de paginación
  p: number = 1; // Página actual
  itemsPerPage: number = 10; // Cantidad de elementos por página (valor predeterminado)
  totalItems: number = 0; // Total de elementos
  pagedProyectos: any[] = []; // Lista paginada
  totalPages: number | any;
  tokenIdUser: any;
  
  constructor(
    private proyectoService: ProyectoService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    // Obtener el valor de isSelectedOption desde la ruta
    this.route.queryParams.subscribe((params) => {
      this.isSelectedOption = params['selectedOption'] || 'userVerification';
      console.log('Valor de isSelectedOption:', this.isSelectedOption);
    });
    this.tokenIdUser = parseInt(this.usuarioService.getTokenId());
    //console.log("Soy el token del usuario: "+ this.tokenIdUser+ " Soy del tip "+ typeof(this.tokenIdUser));

    this.verProyectos();
  }

  verProyectos() {
    if (this.isSelectedOption != 'misProyectos') {
      // Llamar al servicio para obtener los proyectos
      this.proyectoService.getAllProyectos().subscribe(
        (data: any) => {
          // Filtrar todos los proyectos
          this.listProyectos = data.filter(
            (proyecto: any) => (proyecto.estadoProyecto = !'')
          );
          this.totalItems = this.listProyectos.length; // Actualizar el total de elementos
          this.calcularTotalPaginas();
          this.paginarProyectos();
        },
        (error) => {
          console.log("Entré en el if");
          
          console.error('Error al cargar proyectos:', error);
        }
      );
    } else {
      console.log("Id User del docente: ", this.tokenIdUser);
      
      // Llamar al servicio para obtener los proyectos
      this.proyectoService.getProyectoByDirectorID(this.tokenIdUser).subscribe(
        (data: any) => {
          // Filtrar proyectos donde aparece el director
          this.listProyectos = data;
          this.totalItems = this.listProyectos.length; // Actualizar el total de elementos
          this.calcularTotalPaginas();
          this.paginarProyectos();
        },
        (error) => {
          console.log("Entré en el else");
          console.error('Error al cargar proyectos:', error);
        }
      );
    }
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
    this.pagedProyectos = this.listProyectos.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  // Método para habilitar Previous y Next
  canShowPrevious(): boolean {
    return this.p > 1;
  }

  canShowNext(): boolean {
    // El botón "Next" se habilita si hay más elementos por mostrar en la siguiente página
    return this.p * this.itemsPerPage < this.totalItems;
  }
}
