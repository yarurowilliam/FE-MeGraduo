import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';
import { Docente } from '../models/docenteFullInfo';

@Injectable({
  providedIn: 'root'
})
export class DocentesService {
  myAppUrl: string;
  myApiUrl: string;
  myApiUrl2: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Persona';
    this.myApiUrl2 = '/api/Programa'
  }

 

  saveInfoTeacher(infoDocente: Docente): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl+ '/GuardarInfoDocenteDefault', infoDocente);
  }

  getListPrograms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl2}/GetListProgramas`);
  }

  // Add a method to fetch full info for a docente
  getFullInfoDocente(identificacion: any): Observable<Docente> {
    // You can interpolate the identificacion in the URL
    return this.http.get<Docente>(`${this.myAppUrl}${this.myApiUrl}/TraerFullInfoDocente/${identificacion}`);
  }

  getTeachersToVerify(): Observable<any[]>{
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}/TraerDocentesPendientesVerificacion`);
  }


  getAllTeachers(): Observable<any[]>{
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}/TraerDocentes`);
  }
  
}
