import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient,
              private loginService: LoginService) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Usuario/';
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
}
