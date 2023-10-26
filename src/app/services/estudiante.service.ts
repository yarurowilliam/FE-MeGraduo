import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';
import { Estudiante } from '../models/estudianteFullInfo';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  myAppUrl: string;
  myApiUrl: string;
  myApiUrl2: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Persona';
    this.myApiUrl2 = '/api/Programa'
  }

 

  saveInfoStudent(infoStudent: Persona): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl+ '/GuardarInfoEstudiante', infoStudent);
  }

  getListPrograms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl2}/GetListProgramas`);
  }

  getStudentsToVerify(): Observable<any[]>{
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}/TraerEstudiantesPendientesVerificacion`);
  }

  getListStudents(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}/TraerEstudiantesValidos/${id.toString()}`);
  }

  getFullInfoEstudiante(identificacion: any): Observable<Estudiante> {  
    return this.http.get<Estudiante>(`${this.myAppUrl}${this.myApiUrl}/TraerInfoPersonaEstudiante/${identificacion}`);
  }

}
