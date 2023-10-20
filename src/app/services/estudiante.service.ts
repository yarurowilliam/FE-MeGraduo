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

  
  getListStudents(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}/TraerEstudiantesValidos/${id.toString()}`);
  }
   // Add a method to fetch full info for a estudiante
   getFullInfoEstudiante(identificacion: any): Observable<Estudiante> {
    // You can interpolate the identificacion in the URL
    return this.http.get<Estudiante>(`${this.myAppUrl}${this.myApiUrl}/TraerInfoPersonaEstudiante/${identificacion}`);
  }

}
