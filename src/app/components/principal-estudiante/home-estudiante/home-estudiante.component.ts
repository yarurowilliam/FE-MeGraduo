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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmUploadDialogComponent } from '../../dialogs/confirm-upload-dialog/confirm-upload-dialog.component';
import { InformacionProyectoGradoFase1 } from 'src/app/models/FileProyectosFase1';
import { InformacionProyectoGradoFase2 } from 'src/app/models/FileProyectosFase2';

@Component({
  selector: 'app-home-estudiante',
  templateUrl: './home-estudiante.component.html',
  styleUrls: ['./home-estudiante.component.css']
})
export class HomeEstudianteComponent implements OnInit{
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
  checkTipoFase = "";
  //VISTA PROYECTO
  tittle1 = "1. INFORMACIÓN GENERAL DE LA PROPUESTA DE PROYECTO DE GRADO";
  rolEstablecido = "";
  tittle2 = "2. INFORMACIÓN ESPECIFICA DE LA PROPUESTA DE PROYECTO DE GRADO";
  tittle3 = "3. PLANTEAMIENTO/FORMULACION DEL PROBLEMA Y JUSTIFICACIÓN";
  tittle5 = "5. OBJETIVO GENERAL Y ESPEFICICOS";
  tittle7 = "7. BIBLIOGRAFÍA";
  page = 1;
  pageSize = 6;
  isReadonly: boolean = false; // o false, dependiendo de la lógica que necesites
  estadoPro = "";


  constructor(private router: Router,
    private loginService: LoginService,
    private aRoute: ActivatedRoute, 
    private toastr: ToastrService,
    private proyectoService : ProyectoService,
    private docenteService : DocentesService,
    private dialog: MatDialog
    ) {}

    lineasInvestigacion = [
      { nombre: "TECNOLOGÍAS DE LA INFORMACIÓN Y LA COMUNICACIÓN", sublineas: ["SISTEMAS DE INFORMACIÓN", "INGENIERÍA DE SOFTWARE", "SEGURIDAD DE INFORMACIÓN", "INFORMÁTICA EDUCATIVA", "TELECOMUNICACIONES Y TELEINFORMATICA"] },
      { nombre: "TRANSFORMACION DIGITAL", sublineas: ["BIG DATA Y ANALITYCS", "SISTEMAS INTELIGENTES", "ROBOTICA Y AUTOMATIZACIÓN", "TECNOLOGIAS EMERGENTES"] }
    ];
  
    sublineasSeleccionadas = [];
  
    onLineaChange(lineaSeleccionada: string) {
      const linea = this.lineasInvestigacion.find(l => l.nombre === lineaSeleccionada);
      this.sublineasSeleccionadas = linea ? linea.sublineas : [];
    }
    
  ngOnInit(): void {
    this.getNombreUsuario();
    console.log(this.nombreUsuario + " " + this.rolU);
  }

  getNombreUsuario(): void{
    this.nombreUsuario = this.loginService.getTokenDecoded().sub;
    this.rolU = this.loginService.getTokenDecoded().sid;
    this.getInfoEstudiante();

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
        descripcion: textoComentario,
        fechaComentario: new Date(),
        idPersona: parseInt(this.nombreUsuario)
      };
      this.proyectoService.addComentario(id, comentario).subscribe(response => {
          this.toastr.success('Comentario agregado!', 'Info');
          console.log('Comentario agregado!', response);
          this.descripcion = "";
          this.getProyecto();
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

  cambiarEstadoProyecto() {
    // Verifica si el estado es ANTEPROYECTO y si no hay fecha seleccionada

    if(this.estadoPro.trim() === ''){
      this.toastr.error('Para continuar debe seleccionar un estado', 'Error')
    }else{
      if(this.proyecto?.tipoFase === "PROPUESTA"){
        this.proyecto.estadoProyecto = 'PROPUESTA EN COMITE';
        this.proyecto.tipoFase = 'PROPUESTA';
      }else if(this.proyecto?.tipoFase === "ANTEPROYECTO"){
        this.proyecto.estadoProyecto = 'ANTEPROYECTO EN COMITE';
        this.proyecto.tipoFase = 'ANTEPROYECTO';
      }else if(this.proyecto?.tipoFase === "PROYECTO"){
        this.proyecto.estadoProyecto = 'PROYECTO EN COMITE';
        this.proyecto.tipoFase = 'PROYECTO';
      }
     
        this.proyectoService.cambiarEstadoPropuesta(this.proyecto.id, this.proyecto).subscribe(
          response => {
            this.toastr.success(response.message, 'Éxito');
            this.loading = false;
            location.reload();
          },
          error => {
            this.toastr.error('Ha ocurrido un error al guardar la información.', 'Error');
            this.loading = false;
          }
        );
        }
      // Resto del código para guardar la información...
    }

  uploadFile(idPropuesta: number) {
    const dialogRef = this.dialog.open(ConfirmUploadDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.selectedFile) {
          this.proyectoService.uploadPdfFile(idPropuesta, this.selectedFile)
            .subscribe(
              response => {
                console.log("AQUIIIIIIIIIIIIIIIIIII " + response.message); // Aquí puedes manejar la respuesta del servidor
                this.toastr.success(response.message, 'Info');
                this.selectedFile = null;
                if(this.archivos.length === 0){
                  location.reload();
                }else{  
                  this.loadArchivos(idPropuesta);
                  this.selectedFile = null;
                }
              },
              error => {
                console.error('Error al subir el archivo:', error);
              }
            );
        } else {
          this.toastr.info('No ha seleccionado ningún archivo', 'Info');
        }
      } else {
        // Aquí el código en caso de que el usuario cancele la acción
      }
    });
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
      this.proyectoService.getProyectoByEstudiante(this.estudiante.identificacion).subscribe(response => {
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
        if(this.proyecto.estadoProyecto === "PROPUESTA CON CORRECCIONES"){
          this.isReadonly = false;
        }else{
          this.isReadonly = true;
        }

        this.checkTipoFase = this.proyecto?.tipoFase;
        this.loadArchivos(this.proyecto.id);
        
        this.loadArchivos2(this.proyecto?.id);
        this.loadArchivos3(this.proyecto?.id);
        console.log('Proyecto:', this.proyecto);
        this.loading = false
      }, error => {
        this.toastr.error('No se ha encontrado un proyecto asignado', 'Error');
        console.error('Error:', error);
        this.loading = false;
      });
    }
  }

  cambiarFase(valor : string){
    this.checkTipoFase = valor;
  }

  goToTheModalidades(): void{
    this.router.navigate(['/home-estudiantes/modalidades-disponibles']);
  }

  
  archivosFase1?: InformacionProyectoGradoFase1[]
  selectedFile2: File = null;

  loadArchivos2(idProyecto: number) {

    this.proyectoService.getAllArchivos2(idProyecto)  // Asume que el método se llama getAllArchivos en el servicio
      .subscribe(data => {
        this.archivosFase1 = data;
      }, error => {
        console.log(error.error.message);
        this.archivosFase1 = [];
      });
  }

  descargarArchivo2(id: number) {
    this.proyectoService.downloadPdfFile2(id).subscribe(data => {
      const blob = new Blob([data], { type: 'application/pdf' });
      saveAs(blob, `anexoANTEPROYECTO-${this.proyecto.titulo}-${id}.pdf`);  // puedes cambiar 'nombreDelArchivo' por el nombre que prefieras
    });
  }
  
  uploadFile2(idPropuesta: number) {
    if (this.selectedFile2) {
      this.proyectoService.uploadPdfFile2(idPropuesta, this.selectedFile2)
        .subscribe(
          response => {
            this.toastr.success(response.message, 'Info');
            this.selectedFile2 = null;
            this.loadArchivos2(idPropuesta);
            this.selectedFile2 = null;
          },
          error => {
            console.error('Error al subir el archivo:', error);
          }
        );
    } else {
      this.toastr.info('No ha seleccionado ningún archivo', 'Info');
    }
  }

  onFileSelected2(event) {
    this.selectedFile2 = <File>event.target.files[0];
  }

  eliminarArchivo2(id: number) {
    this.proyectoService.eliminarAnexo2(id).subscribe(
      response => {
        console.log(response.message);
        this.toastr.success(response.message, 'Info');
        this.loadArchivos2(this.proyecto.id);
      },
      error => {
        this.toastr.error(error.error.message, 'Error');
        console.error('Error al eliminar el archivo:', error);
      }
    );
  }

  archivosFase2?: InformacionProyectoGradoFase2[]
  selectedFile3: File = null;

  loadArchivos3(idProyecto: number) {

    this.proyectoService.getAllArchivos3(idProyecto)  // Asume que el método se llama getAllArchivos en el servicio
      .subscribe(data => {
        this.archivosFase2 = data;
      }, error => {
        console.log(error.error.message);
        this.archivosFase2 = [];
      });
  }

  descargarArchivo3(id: number) {
    this.proyectoService.downloadPdfFile3(id).subscribe(data => {
      const blob = new Blob([data], { type: 'application/pdf' });
      saveAs(blob, `anexoPROYECTO-${this.proyecto.titulo}-${id}.pdf`);  // puedes cambiar 'nombreDelArchivo' por el nombre que prefieras
    });
  }
  
  uploadFile3(idPropuesta: number) {
    if (this.selectedFile3) {
      this.proyectoService.uploadPdfFile3(idPropuesta, this.selectedFile3)
        .subscribe(
          response => {
            this.toastr.success(response.message, 'Info');
            this.selectedFile3 = null;
            this.loadArchivos3(idPropuesta);
            this.selectedFile3 = null;
          },
          error => {
            console.error('Error al subir el archivo:', error);
          }
        );
    } else {
      this.toastr.info('No ha seleccionado ningún archivo', 'Info');
    }
  }

  onFileSelected3(event) {
    this.selectedFile3 = <File>event.target.files[0];
  }

  eliminarArchivo3(id: number) {
    this.proyectoService.eliminarAnexo3(id).subscribe(
      response => {
        console.log(response.message);
        this.toastr.success(response.message, 'Info');
        this.loadArchivos3(this.proyecto.id);
      },
      error => {
        this.toastr.error(error.error.message, 'Error');
        console.error('Error al eliminar el archivo:', error);
      }
    );
  }
}
