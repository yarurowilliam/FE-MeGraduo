import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Usuario } from '../models/usuarioRegister';
import { Login } from '../models/usuarioLogin';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  myAppUrl: string;
  myApiUrl: string;
  myApiUrl2: string;
  myApiUrl3: string;
  myApiUrl4: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Login';
    this.myApiUrl2 = '/api/Usuario';
    this.myApiUrl3 = '/api/Persona';
    this.myApiUrl4 = '/api/Rol';

  }

  login(usuario: Login): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, usuario);
  }

  //
  getRole(id: number): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/GetRoles?id=${id.toString()}`);
  }

  getUserDetails(id: number): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl2}/VerificarUsuario/${id.toString()}`);
  }

  getListRoles():Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl4}/GetListRoles`);
  }

  getEstudianteDeatils(id: number): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl3}/TraerInfoPersonaEstudiante/${id.toString()}`);
  }
  
  setLocalStorage(data: string | any, rol: any, identification: string | any, status: string | any ): void {
    localStorage.setItem('token', data);
    localStorage.setItem('rol', rol);
    localStorage.setItem('identificacion', identification);
    localStorage.setItem('status', status);
    //AGREGAR QUE GUARDE LA IDENTIFICACION, GUARDE EL ESTADO "COMPLETADO" , "EN PROYECTO" , "PEDNIENTE VERIFCAICION".
  }

  getIdentificationLocalStorage():any{
    const identification = localStorage.getItem('identificacion');
    if(identification){
      return identification; 
    }else{
      return null;
    }
  }

  getStatusLocalStorage():any{
    const status = localStorage.getItem('status');
    if(status){
      return status; 
    }else{
      return null;
    }
  }

  removeLocalStorge(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('status');
    localStorage.removeItem('identificacion');
  }

  getTokenDecoded(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const helper = new JwtHelperService();
      const decodeToken = helper.decodeToken(token);
      return decodeToken;
    } else {      
      return null;
    }
  }

  getRoleLocalStorage():any{
    const role = localStorage.getItem('rol');
    if (role) {
      return role;
    } else {      
      return null;
    }
  }

  getToken(): string {
    return localStorage.getItem('token') || "";
  }
  
  hasRole(rol: string): boolean {
    let roles: string[]
    var rolesTest = this.getRoleLocalStorage();
    console.log("EN HASROLE: "+ rolesTest)
    var rolesArray = typeof rolesTest === 'string' ? rolesTest.split(',') : [];
    console.log("EN HASROLE ARRAY: "+ rolesArray)
    
    if(rolesArray.includes("ESTUDIANTE")){
      console.log("Entro por estudiante..")
      roles =["ESTUDIANTE"];
      return roles.indexOf(rol) >= 0;
    }else if(this.getTokenDecoded().sid=="EMPLEADO"){
      roles =["ADMINISTRADOR"];
      return roles.indexOf(rol) >= 0;
    }else{
      return false;
    }
  }

}
