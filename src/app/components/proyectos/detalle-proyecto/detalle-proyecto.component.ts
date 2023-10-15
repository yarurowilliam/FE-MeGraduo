import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ProyectoService } from 'src/app/services/proyecto.service';



@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css']
})
export class DetalleProyectoComponent implements OnInit {
  proyecto: any; // Esta propiedad almacenará los detalles del proyecto
  // Otras propiedades según tus necesidades

  constructor(
    private route: ActivatedRoute,
    private proyectoService: ProyectoService,
    private router: Router,
    private loginService: LoginService,
    
  ) {}

  ngOnInit() {
  // Obtén el id del proyecto desde la URL
  const idProyectoStr = this.route.snapshot.paramMap.get('id');

  if (idProyectoStr !== null) {
    const idProyecto = +idProyectoStr; // Convierte a número si no es null
    if (!isNaN(idProyecto)) {
      // Comprueba que el valor sea un número válido
      // Llama al servicio para obtener los detalles del proyecto
      this.proyectoService.getProyectoPorId(idProyecto).subscribe(
        (data: any) => {
          this.proyecto = data; // Almacena los detalles del proyecto en la propiedad 'proyecto'
        },
        (error) => {
          console.error('Error al cargar detalles del proyecto:', error);
        }
      );
    }
  }
}



back(): void{
  const role = this.loginService.getRoleLocalStorage()
  console.log("este es el rol:"+ role)

  if(role == 'DOCENTE_COMITE'){
    this.router.navigate(['/docente-panel/docente-comite']);
  } else {
    this.router.navigate(['/docente-panel/docente-view']);
  } 
}


}
