import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from 'src/app/models/estudianteFullInfo';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-estudiante',
  templateUrl: './home-estudiante.component.html',
  styleUrls: ['./home-estudiante.component.css']
})
export class HomeEstudianteComponent implements OnInit{
  loading = false;
  nombreUsuario: string;
  rolU: string;
  estudiante : Estudiante;

  constructor(private router: Router,
    private loginService: LoginService,
    private aRoute: ActivatedRoute, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getNombreUsuario();
    console.log(this.nombreUsuario + " " + this.rolU);
  }

  getNombreUsuario(): void{
    this.nombreUsuario = this.loginService.getTokenDecoded().sub;
    this.rolU = this.loginService.getTokenDecoded().sid;
    this.getInfoEstudiante();
  }

  getInfoEstudiante(): void {
    this.loginService.getEstudianteDeatils(parseInt(this.nombreUsuario)).subscribe(
      data => {
        this.estudiante = data;
        console.log(this.estudiante);
      },
      error => {
        console.log(error);
      }
    );
  }

  goToTheModalidades(): void{
    this.router.navigate(['/home-estudiantes/modalidades-disponibles']);
  }
}
