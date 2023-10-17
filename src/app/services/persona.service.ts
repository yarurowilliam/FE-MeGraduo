import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Persona } from '../models/persona';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Estudiante } from '../models/estudianteFullInfo';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  myAppUrl: string;
  myApiUrl: string;
  myApiUrl2: string;
  myApiUrl3: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Usuario/';
    this.myApiUrl2 = '/api/Sede/';
    this.myApiUrl3 = '/api/Persona';

  }

  saveInfoPersona(infoPerson: Persona): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl3+ '/GuardarInfoPersona', infoPerson);
  }

  saveProfileTeacher(teacherProfile: Persona): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, teacherProfile);
  }

  getListSedes(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + this.myApiUrl2);
  }
 
  getPersonaEstudiante(id: number): Observable<Estudiante> {
    const url = `${this.myAppUrl + this.myApiUrl}${id}`;
    return this.http.get<Estudiante>(url);
  }
  


}
