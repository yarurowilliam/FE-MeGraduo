import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuarioRegister';
import { UserRegisterService } from 'src/app/services/user-register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  selectedUserType: string = ''; 
  registrationForm: FormGroup;
  showPassword: boolean = false;
  loading: boolean = false;

  constructor(private fb: FormBuilder, 
    private usuarioService: UserRegisterService,
    private router: Router,
    private toastR: ToastrService) {
    this.registrationForm = this.fb.group({
      identificacion: ['',[Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rolDefault: [this.selectedUserType, [Validators.required]],
      estadoUsuario: [''],
      confirmPassword: ['']
    }, {validators: this.checkPassword});
  }

  ngOnInit(): void {
    
  }

  changeUserType(userType: string): void {
  this.selectedUserType = userType;
  this.registrationForm.get('rolDefault')?.setValue(this.selectedUserType);
  }

  //Metodo registrar usuario
  registrarUsuario(): void {
    console.log(this.registrationForm);

    const userRegister: Usuario = {
      identificacion: this.registrationForm.value.identificacion,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      estadoUsuario:  "string",
      rolDefault:this.selectedUserType
      
    };

    this.loading = true;
    
    this.usuarioService.saveUser(userRegister).subscribe((data) => {
      console.log(data);
      this.toastR.success("El usuario "+ userRegister.email +" fue registrado con éxito, por favor revise la bandeja de entrada de su correo y confirme", "Usuario registrado");
      this.router.navigate(['/login']);
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error);
      this.toastR.error(error.error.message, "Error registrar usuario!");
      this.registrationForm.reset();
    });
  }


  //Metodo confirmar password
  checkPassword(group: FormGroup): any {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;

    return pass === confirmPass ? null : { notSame: true };
  }

}
