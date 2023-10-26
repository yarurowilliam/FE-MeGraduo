import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-confirmar-proyecto',
  templateUrl: './confirmar-proyecto.component.html',
  styleUrls: ['./confirmar-proyecto.component.css']
})
export class ConfirmarProyectoComponent {
  idProyecto: number;
  identificacion: number;
  loading = false;
  error = false;
  msgAlerta : string = '';
  toHome = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _service: UsuarioService,
    private location: Location,
    private toastr: ToastrService,
    private proyectoService : ProyectoService
  ) { 

   
  }

  ngOnInit(): void {
    
    this.idProyecto = +this.route.snapshot.paramMap.get('idProyecto'); 
    this.identificacion = +this.route.snapshot.paramMap.get('identificacion');

    console.log('ID Proyecto:', this.idProyecto);
    console.log('Identificación:', this.identificacion);
  }

  volverAPrinciapl(): void{
      this.router.navigate(['/home']);
  }

  onConfirmarPropuesta() {
    this.loading = true;
    if (this.identificacion != 0 || this.identificacion != null && this.idProyecto != 0 || this.idProyecto != null) {
      this.proyectoService.aceptarParticipacion(this.idProyecto, this.identificacion).subscribe(response => {
        this.toastr.success(response.message + " , REDIRECCIONANDO A HOME...", 'Confirmación de propuesta');    
        console.log('Respuesta:', response);
        this.loading = true;
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 3000);
      }, error => {
        this.toastr.error(error.error.message, 'Confirmación de propuesta');
        this.loading = false;
        this.error = true;
        this.msgAlerta = error.error.message;
        console.error('Error:', error);
      });
    }else{
      this.toastr.error('Id del usuario no encontrado.', 'Confirmación de propuesta');
      console.error('Id del usuario no encontrado.');
      this.loading = false;
      this.error = true;
      this.msgAlerta = 'Identificacion del usuario no encontrado.';
    }
}

  get(): void {
  }
}
