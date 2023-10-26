import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Usuario/';
  }

  confirmarEmail(id: number): Observable<any> {
    return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}ConfirmarEmail/${id}`, {});
}
  // Método para obtener la verificación total de un usuario por ID
  verificacionTotalUsuario(
    id: number,
    creditosAcademicos?: number
  ): Observable<any> {
    // Construye los parámetros de consulta
    const params = new HttpParams();
    if (creditosAcademicos !== undefined) {
      params.set('creditosAcademicos', creditosAcademicos.toString());
    }

    return this.http.put(
      `${this.myAppUrl}${this.myApiUrl}VerificadoTotal/${id}`,
      { params }
    );
  }

  getTokenId(): number | any {
    // Obtener el token del localStorage
    const token = this.loginService.getToken();

    if (token) {
      // Decodificar el token para obtener los datos
      const decodeToken = this.loginService.getTokenDecoded();

      // Verificar si el token decodificado contiene idUsuario
      if (decodeToken && decodeToken.idUsuario) {
        var idUsuario = decodeToken.idUsuario;
      }
      return idUsuario;
    }
  }

  asignarRol(identificacion: number, nombreRol: string): Observable<any> {
    // Construye los parámetros de la consulta en la URL
    const params = new HttpParams()
      .set('identificacion', identificacion.toString())
      .set('nombreRol', nombreRol);
  
    // Realiza una solicitud POST vacía, ya que los parámetros se incluyen en la URL
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}AsignarRol`, null, { params });
  }
  
}
