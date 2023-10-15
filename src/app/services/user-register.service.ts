import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuarioRegister';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Usuario';
  }

  // http://localhost:xxxxx/api/Usuario -- POST
  saveUser(userRegister: Usuario): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, userRegister);
  }

}
