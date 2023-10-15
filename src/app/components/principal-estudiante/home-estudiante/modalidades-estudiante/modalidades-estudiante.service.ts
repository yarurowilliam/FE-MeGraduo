import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/models/persona';

@Injectable({
  providedIn: 'root'
})
export class ModalidadesEstudianteService {
  myAppUrl: string;
  myApiUrl: string;
  myApiUrl2: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    //this.myApiUrl = '/api/ProyectoGrado';
    this.myApiUrl2 = '/api/ProyectoGrado'
  }    

  validarRequisitos(identificacion: number): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl2}/ValidarRequisitos?identificacion=${identificacion}`;
    return this.http.post(url, {});
  }
  
}
