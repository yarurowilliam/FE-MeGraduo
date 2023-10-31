import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { ProyectoGrado } from '../models/proyectoGrado';
import { environment } from '../environments/environment';
import { FileProyectosGrado } from '../models/FileProyectosGrado';
import { Comentario } from '../models/comentario';


@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  myAppUrl: string;
  myApiUrl: string;
  

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/ProyectoGrado';
    
  }

  getProyectoByEstudiante(identificacion: number): Observable<any> {
    return this.http.get(`${this.myAppUrl}/api/ProyectoGrado/TraerProyectoByEstudiante/${identificacion.toString()}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  
  getAllProyectos(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/GetListProyectosAll`);
  }

  getProyectoPorId(id: number): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/${id.toString()}`);
  }

  getProyectoByDirectorID(id: number): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/GetListProyectoByDirector/${id.toString()}`);
  }

  getProyectoByJuradoID(id: number): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/GetListProyectoByJurado/${id.toString()}`);
  }

  getProyectoByAsesorID(id: number): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/GetListProyectoByAsesor/${id.toString()}`);
  }
 

  uploadPdfFile(idPropuesta: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
  
    return this.http.post(`${this.myAppUrl}/api/ProyectoGrado/upload/${idPropuesta}`, formData)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getPersonaProyecto(id: number): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}/api/ProyectoGrado/GetPersonaProyecto/${id}`);
  }

  addComentario(idProyecto: number, comentario: Comentario) {
    const url = `${this.myAppUrl}/api/ProyectoGrado/AddComentario/${idProyecto}`;
    return this.http.post(url, comentario);
}

  eliminarAnexo(id: number): Observable<any> {
    const url = `${this.myAppUrl}/api/ProyectoGrado/EliminarAnexo/${id}`;
    return this.http.delete<any>(url);
  }
  
  downloadPdfFile(id: number): Observable<Blob> {
    const url = `${this.myAppUrl}/api/ProyectoGrado/download/${id}`;
    return this.http.get(url, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/pdf')
    });
  }

  postProyecto(proyecto: ProyectoGrado): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, proyecto, { headers: headers })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  aceptarParticipacion(idProyecto: number, identificacion: number): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}/AceptarParticipacion/${idProyecto}/${identificacion}`;
    return this.http.put(url, {}) // No hay necesidad de enviar un cuerpo si ya se proporciona todo a través de la ruta.
      .pipe(
        catchError(this.errorHandler)
      );
  }


getAllArchivos(idPropuesta: number): Observable<FileProyectosGrado[]> {
  return this.http.get<FileProyectosGrado[]>(`${this.myAppUrl}${this.myApiUrl}/GetAnexos/${idPropuesta}`) // Asegúrate de poner la URL correcta
    .pipe(
      catchError(this.errorHandler)
    );
}

cambiarEstadoPropuesta(idProyecto: number, proyecto: ProyectoGrado) {
  const url = `${this.myAppUrl}/api/ProyectoGrado/ActualizarProyecto/${idProyecto}`;
  return this.http.post(url, proyecto);
}

cambiarDirector(idProyecto: number, idDirector: number) {
  const url = `${this.myAppUrl}/api/ProyectoGrado/AddDirector/${idProyecto}`;
  return this.http.post(url, idDirector);
}

cambiarAsesor(idProyecto: number, idAsesor: number) {
  const url = `${this.myAppUrl}/api/ProyectoGrado/AddAsesor/${idProyecto}`;
  return this.http.post(url, idAsesor);
}

cambiarAntePro(idProyecto: number, fechaNew: Date) {
  const url = `${this.myAppUrl}/api/ProyectoGrado/AddFechaAnteProyecto/${idProyecto}`;
  return this.http.post(url, fechaNew);
}
  // Manejador de errores genérico (esto es solo un ejemplo, puedes personalizarlo según tus necesidades)
  errorHandler(error: any): Observable<never> {
    console.error('Error en el servicio:', error);
    return throwError(error);
  }
  
  

}
