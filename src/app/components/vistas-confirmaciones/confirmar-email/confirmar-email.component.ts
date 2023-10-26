import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmar-email',
  templateUrl: './confirmar-email.component.html',
  styleUrls: ['./confirmar-email.component.css']
})
export class ConfirmarEmailComponent {
  identificacion: string = '';
  loading = false;
  error = false;
  msgAlerta : string = '';
  toHome = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _service: UsuarioService,
    private location: Location,
    private toastr: ToastrService
  ) { 

   
  }

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id');
    this.identificacion = id;
    console.log(this.identificacion);
  }

  volverAPrinciapl(): void{
      this.router.navigate(['/home']);
  }

  onConfirmEmail() {
    this.loading = true;
    if (this.identificacion != '' || this.identificacion != null) {
        this._service.confirmarEmail(parseInt(this.identificacion)).subscribe(
            response => {
                this.toastr.success(response.message + " , REDIRECCIONANDO A HOME...", 'Confirmación de email');
                console.log(response.message); // o puedes mostrar un mensaje en la UI
                this.loading = true;
                setTimeout(() => {
                  this.router.navigate(['/home']);
                }, 3000);
            },
            error => {
              this.toastr.error(error.error.message, 'Confirmación de email');
              this.loading = false;
              this.error = true;
              this.msgAlerta = error.error.message;
            }
        );
    } else {
        this.toastr.error('Id del usuario no encontrado.', 'Confirmación de email');
        console.error('Id del usuario no encontrado.');
        this.loading = false;
        this.error = true;
        this.msgAlerta = 'Identificacion del usuario no encontrado.';
    }
}

  get(): void {
  }

}
