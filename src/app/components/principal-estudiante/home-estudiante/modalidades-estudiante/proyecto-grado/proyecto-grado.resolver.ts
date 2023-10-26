import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class ProyectoGradoResolver implements Resolve<any> {
  constructor(private loginService: LoginService) {}

  resolve(): Observable<any> {
    return this.loginService.getEstudianteDeatils(parseInt(this.loginService.getTokenDecoded().sub));
  }
}