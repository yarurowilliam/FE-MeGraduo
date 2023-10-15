import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError, timeout } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Login } from 'src/app/models/usuarioLogin';
import { forkJoin } from 'rxjs';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading = false;
  //role: string = '' ;
  role: string[]=[];
  status: string = '';
  login: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService,
    private aRoute: ActivatedRoute
  ) {
    this.login = this.fb.group({
      identificacion: ['', Validators.required],  
      //email: ['', [Validators.required,Validators.email]],    
      password: ['', Validators.required],
    });
  }


  log(): void {
    this.loading = true;
  
    const usuario: Login = {
      identificacion: this.login.value.identificacion,
      password: this.login.value.password
    };
  
    forkJoin([
      this.loginService.login(usuario),
      this.getRoles(usuario.identificacion),
      this.getUserStatus(usuario.identificacion)
    ]).subscribe(
      ([loginData, roles, userStatus]) => {
        console.log(loginData);
        this.role = roles;
        console.log("Roles:", this.role);
        this.status = userStatus;
        const statusString = userStatus.status.toString();
        console.log("StatusString:", statusString);
        console.log("Status:", this.status);
  
        // Ahora que tienes todos los datos, puedes continuar con la lógica basada en el rol y el estado.
        this.loading = false;
        this.loginService.setLocalStorage(loginData.token, this.role);
        let roleString = this.role[0]
        console.log("RoleString:", roleString);
        
        //CONFIRMACIÓN DE ROLES
                if ((roleString === "ESTUDIANTE" || roleString === "DOCENTE"  ) && statusString === 'CONFIRMAR EMAIL') {
                  this.toastr.info("Señor " +roleString.toLowerCase() +" por favor confirmar e-mail en su bandeja de correo!", 'Confirmación E-mail pendiente');
                  this.router.navigate(['/login']); // Redirigir a login con mensaje de confirmación de email pendiente 
                  this.login.reset();
                } else if (roleString === "ESTUDIANTE" && statusString === 'COMPLETAR INFORMACION') {
                  this.toastr.info("Por favor completar su perfil en la plataforma!", 'Completar perfil');
                  this.router.navigate(['/completar-perfil-student']); // Redirigir a componente de completado de perfil
                } else if (roleString === "ESTUDIANTE" && statusString === 'PENDIENTE VERIFICACION') {
                  this.toastr.info("Su cuenta está en proceso de verificación por parte del administrador", 'Verificación Admin ');
                  this.router.navigate(['/home-estudiantes/pendiente-verificacion']); // Redirigir a componente 
                  this.login.reset();
                }else if (roleString === "ESTUDIANTE" && statusString === 'VERIFICADO') {
                  this.toastr.info("Bienvenido Estudiante!", 'Welcome');
                  this.router.navigate(['/home-estudiantes']); // Redirigir a componente programa
                  this.login.reset();
                } else if (roleString === "DOCENTE" && statusString === 'COMPLETAR INFORMACION') {
                  this.toastr.info("Por favor completar su perfil en la plataforma!", 'Completar perfil');
                  this.router.navigate(['/completar-perfil-teacher']); // Redirigir a componente de completado de perfil DOCENTE
                }
                else  if (this.role.includes("DOCENTE_DIRECTOR")) {
                  this.toastr.success('Ingreso fue exitoso, bienvenido docente ' + usuario.identificacion , 'Operacion exitosa!');
                  this.router.navigate(['/docente-panel/docente-director']); // Redirigir a componente de docentes director
                }else  if (this.role.includes("DOCENTE_COMITÉ")) {
                  this.toastr.success('Ingreso fue exitoso, bienvenido docente ' + usuario.identificacion , 'Operacion exitosa!');
                  this.router.navigate(['/docente-panel/docente-comité']); // Redirigir a componente de docentes de comité ******(POR AHORA)*******
                }
                else {
                  
                  this.router.navigate(['/login']);
                  console.log("error")
                  this.login.reset();
                }
      },
      (error) => {
        // Manejo de errores general
        console.error(error);
        this.loading = false;
        this.toastr.error("Error en el inicio de sesión", 'Error');
        this.login.reset();
      }
    );
  }
  
  //Log método anterior
  // log(): void {
  //   this.loading = true;
  
  //   const usuario: Login = {
  //     identificacion: this.login.value.identificacion,
  //     //email: this.login.value.email,
  //     password: this.login.value.password
  //   };
  
  //   this.loginService.login(usuario).subscribe(
  //     (data) => {
  //       console.log(data);
  
  //       // Llamada al método getRoles
  //       this.getRoles(usuario.identificacion).subscribe(
  //         (role: string | any []) => {
  //           this.role = role;
  //           console.log("Soy el rol: " + this.role + " y soy de tipo: " + typeof(this.role));
  
  //           // Llamada al método getUserStatus
  //           this.getUserStatus(usuario.identificacion).subscribe(
  //             (userData: any) => {
  //               this.status = userData.status;
  //               console.log("Soy el estado: " + this.status + " y soy de tipo: " + typeof(this.status));
                
  //               // Ahora que tenemos el valor del rol y estado, podemos continuar con las comparaciones
  //               this.loading = false;
  //               this.loginService.setLocalStorage(data.token, this.role);  
  //               //CONFIRMACIÓN DE ROLES
  //               if (this.role === 'ESTUDIANTE' && this.status === 'CONFIRMAR EMAIL') {
  //                 this.toastr.info("Señor " +this.role.toLowerCase() +" por favor confirmar e-mail en su bandeja de correo!", 'Confirmación E-mail pendiente');
  //                 this.router.navigate(['/login']); // Redirigir a login con mensaje de confirmación de email pendiente 
  //                 this.login.reset();
  //               } else if (this.role === 'ESTUDIANTE' && this.status === 'COMPLETAR INFORMACION') {
  //                 this.toastr.info("Por favor completar su perfil en la plataforma!", 'Completar perfil');
  //                 this.router.navigate(['/completar-perfil-student']); // Redirigir a componente de completado de perfil
  //               } else if (this.role === 'ESTUDIANTE'  && this.status === 'PENDIENTE DE VERIFICACION') {
  //                 this.toastr.info("Su cuenta está en proceso de verificación por parte del administrador", 'Verificación Admin ');
  //                 this.router.navigate(['/login']); // Redirigir a componente 
  //                 this.login.reset();
  //               } else if (this.role === 'ESTUDIANTE' && this.status === 'VERIFICADO') {
  //                 this.toastr.success('Ingreso fue exitoso, bienvenido ' + usuario.identificacion , 'Operacion exitosa!');
  //                 this.router.navigate(['/programa']); // Redirigir a componente programa
  //               }else if (this.role === 'DOCENTE' && this.status === 'COMPLETAR INFORMACION') {
  //                 this.toastr.success('Ingreso fue exitoso, bienvenido docente ' + usuario.identificacion , 'Operacion exitosa!');
  //                 this.router.navigate(['/docente-panel/docente-view']); // Redirigir a componente de docentes de comité ******(POR AHORA)*******
  //               }else if (this.role === 'DOCENTE_COMITE' && this.status === 'COMPLETAR INFORMACION') {
  //                 this.toastr.success('Ingreso fue exitoso, bienvenido docente ' + usuario.identificacion , 'Operacion exitosa!');
  //                 this.router.navigate(['/docente-panel/docente-comite']); // Redirigir a componente de docentes de comité ******(POR AHORA)*******
  //               }else{
  //                 this.toastr.warning('Señor ' + usuario.identificacion + ' el módulo de docente se encuentra en desarrollo', 'Operacion exitosa!');
  //                 this.router.navigate(['/login']); // Redirigir a login 
  //                 this.login.reset();
  //               }
  //             },
  //             (error) => {
  //               // Manejo de errores al obtener el estado del usuario
  //               console.log(error);
  //               this.loading = false;
  //               this.toastr.error("Error en el inicio de sesión", 'Error');
  //               this.login.reset();
  //             }
  //           );
  //         },
  //         (error) => {
  //           // Manejo de errores al obtener el rol
  //           console.log(error);
  //           this.loading = false;
  //           this.toastr.error("Error en el inicio de sesión", 'Error');
  //           this.login.reset();
  //         }
  //       );
  //     },
  //     (error) => {
  //       // Manejo de errores al hacer login
  //       console.log(error);
  //       this.loading = false;
  //       this.toastr.error("Error en el inicio de sesión", 'Error');
  //       this.login.reset();
  //     }
  //   );
  // }
  
  
  //Get role método anterior
  // getRoles(identificacion: number): Observable<string> {
  //   return this.loginService.getRole(identificacion).pipe(
  //     map((response: any[]) => {
  //       if (response && response.length > 0) {
  //         return response[0].rolName;
  //       } else {
  //         console.error('No se encontraron roles para la identificación:', identificacion);
  //         this.toastr.error("No se encontraron roles para la identificación", 'Error');
  //         throw new Error("No se encontraron roles");
  //       }
  //     }),
  //     catchError((error: any) => {
  //       console.error('Error obteniendo el rol:', error);
  //       this.toastr.error("Error obteniendo rol y estatus", 'Error');
  //       return throwError(error);
  //     })
  //   );
  // }


 getRoles(identificacion: number): Observable<string[]> {
    return this.loginService.getRole(identificacion).pipe(
      map((response: any[]) => {
        if (response && response.length > 0) {
         // Mapea los nombres de roles en un arreglo
          const roles = response.map((item) => item.rolName);
          return roles;
        } else {
          console.error('No se encontraron roles para la identificación:', identificacion);
          this.toastr.error("No se encontraron roles para la identificación", 'Error');
          throw new Error("No se encontraron roles");
        }
      }),
      catchError((error: any) => {
        console.error('Error obteniendo los roles:', error);
        this.toastr.error("Error obteniendo roles", 'Error');
        return throwError(error);
      })
    );
  }


  getUserStatus(identificacion: number): Observable<any | []> {
    return this.loginService.getUserDetails(identificacion).pipe(
      map((response: any) => {
        const userData = {
          status: response.estadoUsuario,
          identificacion: response.identificacion,
          email: response.email
        };
        console.log("User data:", userData); // Imprime el objeto en la consola
        return userData;
      }),
      catchError((error: any) => {
        console.error('Error obteniendo detalles del usuario:', error);
        return throwError(error);
      })
    );
  }
  

  msg():void{
    this.toastr.info("Por favor acercarse a administración!", 'Info');
  }

}
