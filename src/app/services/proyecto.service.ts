import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ProyectoGrado } from '../models/uploadAnexos';
import { environment } from '../environments/environment';

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
 

  uploadData(file: FormData): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl + '/upload', file).pipe(
      catchError((error) => {
        console.error('Error al subir el archivo:', error);
        throw error; // Lanza el error para que se maneje en el componente
      })
    );
  }
  
  

}
