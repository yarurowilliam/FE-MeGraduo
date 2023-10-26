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
  //VISTA PROYECTO
  tittle1 = "1. INFORMACIÓN GENERAL DE LA PROPUESTA DE PROYECTO DE GRADO";
  rolEstablecido = "";
  tittle2 = "2. INFORMACIÓN ESPECIFICA DE LA PROPUESTA DE PROYECTO DE GRADO";
  tittle3 = "3. PLANTEAMIENTO/FORMULACION DEL PROBLEMA Y JUSTIFICACIÓN";
  tittle5 = "5. OBJETIVO GENERAL Y ESPEFICICOS";
  tittle7 = "7. BIBLIOGRAFÍA";
  page = 1;
  pageSize = 6;
  constructor(private router: Router,
    private loginService: LoginService,
    private aRoute: ActivatedRoute, 
    private toastr: ToastrService,
    private proyectoService : ProyectoService,
    private docenteService : DocentesService
    ) {}

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
