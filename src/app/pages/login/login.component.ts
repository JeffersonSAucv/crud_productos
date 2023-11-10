import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { AutenticacionService } from 'src/app/service/autenticacion.service';
import { UserAuth } from '../../interfaces/login.interface';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  hide = true;
  logginLoading = false;

  public myForm : FormGroup = this.fb.group({
    usuario: ['',[Validators.required,Validators.minLength(5)]],
    password: ['',[Validators.required,Validators.minLength(5)]],

  })


  constructor(
      public fb : FormBuilder,
     private auth: AutenticacionService,
     private router: Router,
     private snackBar: MatSnackBar

     ) { }

  ngOnInit() { }

  mensajeEmergente(status : number,mensaje:string){
    this.snackBar.open(
     status === 0 ? `Estatus:${status}, Porfavor contacte con el Administrador.`: `${mensaje}`,
     '', {
      duration: 2000,
    });
  }
  authLogin(){
      this.logginLoading = true;
      const login : UserAuth={
        correo : this.myForm.get('usuario')?.value,
        password : this.myForm.get('password')?.value,
      }
      this.auth.loginAuth(login)
      .pipe(
        catchError(err => {
          this.logginLoading = false;
          console.log(err.error.msg);
          this.mensajeEmergente(err.status,err.error.msg)
          return throwError(()=>err);
        })
      )
      .subscribe(res=>{
        this.logginLoading = false;
        console.log('res',res);
        const userSesion = {
          nombre : res.usuario.nombre,
          rol : res.usuario.rol,
          correo : res.usuario.correo

        }
        console.log('userSesion',JSON.stringify(userSesion));
        //local storage guarda solo string y se convierte a string el objeto

        localStorage.setItem('token',res.token);
        localStorage.setItem('userSesion',JSON.stringify(userSesion));

        this.router.navigate(['/lista-productos'])
      })

  }
}
