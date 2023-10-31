import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from 'src/app/models/estudianteFullInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoGrado } from 'src/app/models/proyectoGrado';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Docente } from 'src/app/models/docenteFullInfo';
import { DocentesService } from 'src/app/services/docentes.service';
import { FileProyectosGrado } from 'src/app/models/FileProyectosGrado';
import { saveAs } from 'file-saver';
import { Comentario } from 'src/app/models/comentario';
import { Persona } from 'src/app/models/persona';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VerDocentesModalComponent } from '../ver-docentes-modal/ver-docentes-modal.component';



@Component({
  selector: 'app-ver-anteproyecto',
  templateUrl: './ver-anteproyecto.component.html',
  styleUrls: ['./ver-anteproyecto.component.css']
})
export class VerAnteproyectoComponent {
  loading = false;
  nombreUsuario?: string;
  rolU?: string;
  estudiante?: Estudiante;
  estudiante1?: Estudiante;
  estudiante2?: Estudiante;
  estudiante3?: Estudiante;
  proyecto?: ProyectoGrado;
  docenteDirector?: Docente;
  docenteAsesor?: Docente;
  docenteJurado1?: Docente;
  docenteJurado2?: Docente;
  archivos?: FileProyectosGrado[]
  descripcion = "";
  persona : Persona;
  limpiarText: '';
  estadoPro : '';
  txtAsesor = '';
  //VISTA PROYECTO
  tittle1 = "1. INFORMACIÓN GENERAL DE LA PROPUESTA DE PROYECTO DE GRADO";
  rolEstablecido = "";
  tittle2 = "2. INFORMACIÓN ESPECIFICA DE LA PROPUESTA DE PROYECTO DE GRADO";
  tittle3 = "3. PLANTEAMIENTO/FORMULACION DEL PROBLEMA Y JUSTIFICACIÓN";
  tittle5 = "5. OBJETIVO GENERAL Y ESPEFICICOS";
  tittle7 = "7. BIBLIOGRAFÍA";
  txtDirector = '';
  page = 1;
  pageSize = 6;
  constructor(private router: Router,
    private loginService: LoginService,
    private aRoute: ActivatedRoute, 
    private toastr: ToastrService,
    private modalService: NgbModal,
    private proyectoService : ProyectoService,
    private docenteService : DocentesService
    ) {}

  ngOnInit(): void {
    this.getNombreUsuario();
    console.log(this.nombreUsuario + " " + this.rolU);
    this.testMetod();
  }

  openModalDocente() {
    console.log("click click")
    this.modalService.open(VerDocentesModalComponent, { size: 'lg' }).result.then((docente) => this.actualizar(docente));
  }

  actualizar(docente: Docente) {
    if(this.txtDirector === docente.identificacion.toString()){
      this.toastr.error('El docente ya se encuentra registrado en la propuesta', 'Error');
    }else{
      this.toastr.success('El director se ha agregado correctamente', 'Éxito');
      this.txtDirector = docente.identificacion.toString();
      console.log(this.txtDirector);
    }
  }

  addDirector(){
    if(this.txtDirector === ''){
      this.toastr.error('No se ha seleccionado un director', 'Error');
    }else{
      this.proyectoService.cambiarDirector(this.proyecto.id, parseInt(this.txtDirector)).subscribe(response => {
        this.toastr.success('Director agregado!', 'Info');
        console.log('Director agregado!', response);
        this.testMetod();
      }, error => {
        console.error('Hubo un error al agregar el director:', error);
        this.toastr.error(error.error.message, 'Error');
      });
    }
  }

  addAsesor(){
    if(this.txtAsesor === ""){
      this.toastr.error('No se ha seleccionado un asesor', 'Error');
    }else{
      this.proyectoService.cambiarAsesor(this.proyecto.id, parseInt(this.txtAsesor)).subscribe(response => {
        this.toastr.success('Asesor agregado!', 'Info');
        console.log('Asesor agregado!', response);
        this.testMetod();
      }, error => {
        console.error('Hubo un error al agregar el asesor:', error);
        this.toastr.error(error.error.message, 'Error');
      });
    }
  }


  openModalDocente2() {
    console.log("click click")
    this.modalService.open(VerDocentesModalComponent, { size: 'lg' }).result.then((docente) => this.actualizar2(docente));
  }

  actualizar2(docente: Docente) {
    if(this.txtAsesor === docente.identificacion.toString()){
      this.toastr.error('El docente ya se encuentra registrado en la propuesta', 'Error');
    }else{
      this.toastr.success('El asesor se ha agregado correctamente', 'Éxito');
      this.txtAsesor = docente.identificacion.toString();
      console.log(this.txtDirector);
    }
  }
  testMetod(): void{
    const idProyectoStr = this.aRoute.snapshot.paramMap.get('id');

    if (idProyectoStr !== null) {
      const idProyecto = +idProyectoStr; // Convierte a número si no es null
      if (!isNaN(idProyecto)) {
        // Comprueba que el valor sea un número válido
        // Llama al servicio para obtener los detalles del proyecto
        this.proyectoService.getProyectoPorId(idProyecto).subscribe(
          (data: any) => {
            this.toastr.info('Proyecto encontrado, cargando info..', 'Info');
            this.proyecto = data;
            if(this.proyecto.idIntegrante1 != null){
              this.getInfoEstudiante1(this.proyecto.idIntegrante1);
            }
            if(this.proyecto.idIntegrante2 != null){
              this.getInfoEstudiante2(this.proyecto.idIntegrante2);
            }
            if(this.proyecto.idIntegrante3 != null){
              this.getInfoEstudiante3(this.proyecto.idIntegrante3);
            }
            if(this.proyecto.idDirector != null){
              this.getInfoDocenteDirector(this.proyecto.idDirector);
            }
            if(this.proyecto.idAsesor != null){
              this.getInfoDocenteAsesor(this.proyecto.idAsesor);
            }
            if(this.proyecto.idJurado != null){
              this.getInfoDocenteJurado1(this.proyecto.idJurado);
            }
            if(this.proyecto.idJurado2 != null){
              this.getInfoDocenteJurado2(this.proyecto.idJurado2);
            }
            this.loadArchivos(this.proyecto.id);
            console.log('Proyecto:', this.proyecto);
            this.loading = false
          },
          (error) => {
            console.error('Error al cargar detalles del proyecto:', error);
          }
        );
      }
    }
  }

  back(): void{
    const role = this.loginService.getRoleLocalStorage()
    console.log("este es el rol:"+ role)
  
    if (role.includes('DOCENTE_COMITE')) {
      window.history.back();
    } else {
      this.router.navigate(['/docente-panel/docente-view']);
    }
  }

  getNombreUsuario(): void{
    this.nombreUsuario = this.loginService.getTokenDecoded().sub;
    this.rolU = this.loginService.getTokenDecoded().sid;
  }

  selectedFile: File = null;

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  eliminarArchivo(id: number) {
    this.proyectoService.eliminarAnexo(id).subscribe(
      response => {
        console.log(response.message);
        this.toastr.success(response.message, 'Info');
        this.loadArchivos(this.proyecto.id);
      },
      error => {
        this.toastr.error(error.error.message, 'Error');
        console.error('Error al eliminar el archivo:', error);
      }
    );
  }
  
  addComentario(textoComentario: string, id: number){
    if(textoComentario == null || textoComentario == ""){
      this.toastr.error('No se puede agregar un comentario vacio', 'Error');
    }else{
      const comentario: Comentario = {
        descripcion: '[COMITE]: ' + textoComentario,
        fechaComentario: new Date(),
        idPersona: parseInt(this.nombreUsuario)
      };
      this.proyectoService.addComentario(id, comentario).subscribe(response => {
          this.toastr.success('Comentario agregado!', 'Info');
          console.log('Comentario agregado!', response);
          this.descripcion = "";
          this.testMetod();
    }, error => {
        console.error('Hubo un error al agregar el comentario:', error);
        this.toastr.error(error.error.message, 'Error');
    });
    }

  }

  descargarArchivo(id: number) {
    this.proyectoService.downloadPdfFile(id).subscribe(data => {
      const blob = new Blob([data], { type: 'application/pdf' });
      saveAs(blob, `anexo-${this.proyecto.titulo}-${id}.pdf`);  // puedes cambiar 'nombreDelArchivo' por el nombre que prefieras
    });
  }

  uploadFile(idPropuesta: number) {
    if (this.selectedFile) {
      this.proyectoService.uploadPdfFile(idPropuesta, this.selectedFile)
        .subscribe(
          response => {
            console.log("AQUIIIIIIIIIIIIIIIIIII " + response.message); // Aquí puedes manejar la respuesta del servidor
            this.toastr.success(response.message, 'Info');
            this.selectedFile = null;
            this.loadArchivos(idPropuesta);
            this.selectedFile = null;
          },
          error => {
            console.error('Error al subir el archivo:', error);
          }
        );
    } else {
      this.toastr.info('No ha seleccionado ningún archivo', 'Info');
    }
  }

  getInfoEstudiante(): void {
    this.loginService.getEstudianteDeatils(parseInt(this.nombreUsuario)).subscribe(
      data => {
        this.estudiante = data;
        console.log(this.estudiante);
        this.getProyecto();
      },
      error => {
        console.log(error);
      }
    );
  }

  loadArchivos(idProyecto: number) {
    this.proyectoService.getAllArchivos(idProyecto)  // Asume que el método se llama getAllArchivos en el servicio
      .subscribe(data => {
        this.archivos = data;
      }, error => {
        console.log(error.error.message);
        this.archivos = [];
      });
  }

  getInfoDocenteDirector(id: number){
    this.docenteService.getFullInfoDocente(id).subscribe(
      data => {
        this.docenteDirector = data;
        console.log(this.docenteDirector);
      },
      error => {
        console.log(error);
      }
    );
  }
  
  getInfoDocenteAsesor(id: number){
    this.docenteService.getFullInfoDocente(id).subscribe(
      data => {
        this.docenteAsesor = data;
        console.log(this.docenteAsesor);
      },
      error => {
        console.log(error);
      }
    );
  }

  getInfoDocenteJurado1(id: number){
    this.docenteService.getFullInfoDocente(id).subscribe(
      data => {
        this.docenteJurado1 = data;
        console.log(this.docenteJurado1);
      },
      error => {
        console.log(error);
      }
    );
  }

  getInfoDocenteJurado2(id: number){
    this.docenteService.getFullInfoDocente(id).subscribe(
      data => {
        this.docenteJurado2 = data;
        console.log(this.docenteJurado2);
      },
      error => {
        console.log(error);
      }
    );
  }

  getInfoEstudiante1(id: number): void {
    this.loginService.getEstudianteDeatils(id).subscribe(
      data => {
        this.estudiante1 = data;
        console.log(this.estudiante1);
      },
      error => {
        console.log(error);
      }
    );
  }



  getInfoEstudiante2(id: number): void {
    this.loginService.getEstudianteDeatils(id).subscribe(
      data => {
        this.estudiante2 = data;
        console.log(this.estudiante2);
      },
      error => {
        console.log(error);
      }
    );
  }

  getInfoEstudiante3(id: number): void {
    this.loginService.getEstudianteDeatils(id).subscribe(
      data => {
        this.estudiante3 = data;
        console.log(this.estudiante3);
      },
      error => {
        console.log(error);
      }
    );
  }

  getProyecto(): void{
    this.loading = true;
    if(this.estudiante.modalidad == 0){
      this.toastr.info('No hay proyecto asignado, escoja una modalidad', 'Info');
    }else{
      this.proyectoService.getProyectoByEstudiante(this.estudiante1.identificacion).subscribe(response => {
        this.toastr.info('Proyecto encontrado, cargando info..', 'Info');
        this.proyecto = response;
        if(this.proyecto.idIntegrante1 != null){
          this.getInfoEstudiante1(this.proyecto.idIntegrante1);
        }
        if(this.proyecto.idIntegrante2 != null){
          this.getInfoEstudiante2(this.proyecto.idIntegrante2);
        }
        if(this.proyecto.idIntegrante3 != null){
          this.getInfoEstudiante3(this.proyecto.idIntegrante3);
        }
        if(this.proyecto.idDirector != null){
          this.getInfoDocenteDirector(this.proyecto.idDirector);
        }
        if(this.proyecto.idAsesor != null){
          this.getInfoDocenteAsesor(this.proyecto.idAsesor);
        }
        if(this.proyecto.idJurado != null){
          this.getInfoDocenteJurado1(this.proyecto.idJurado);
        }
        if(this.proyecto.idJurado2 != null){
          this.getInfoDocenteJurado2(this.proyecto.idJurado2);
        }
        this.loadArchivos(this.proyecto.id);
        console.log('Proyecto:', this.proyecto);
        this.loading = false
      }, error => {
        this.toastr.error('No se ha encontrado un proyecto asignado', 'Error');
        console.error('Error:', error);
        this.loading = false;
      });
    }
  }

  goToTheModalidades(): void{
    this.router.navigate(['/home-estudiantes/modalidades-disponibles']);
  }

}
