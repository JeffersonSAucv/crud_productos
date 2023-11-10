import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuth, UserLogin } from 'src/app/interfaces/login.interface';
import { AutenticacionService } from 'src/app/service/autenticacion.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-page',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  hide = true;
  logginLoading = false;
  patterEmail = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}'

  public myForm : FormGroup = this.fb.group({
    usuario: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')]],
    password: ['',[Validators.required,Validators.minLength(6)]],
    nombre: ['',[Validators.required,Validators.minLength(12)]],

  })
  constructor(

    public fb : FormBuilder,
    public autenticationService : AutenticacionService,
    public router : Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  mensajeEmergente(status : number,mensaje:string){
    this.snackBar.open(
     status === 0 ? `Estatus:${status}, Porfavor contacte con el Administrador.`
                  : status === 200
                    ? `Bienvenido ${this.myForm.value.nombre}` :
                     `${mensaje}`,

     '', {
      duration: 2000,
    });
  }

  createAcount(){

    this.logginLoading = true;
    const user : UserAuth={
      nombre : this.myForm.value.nombre,
      correo : this.myForm.value.usuario,
      password : this.myForm.value.password,
      rol : 'USER_ROLE'
    }

    if (!this.myForm.valid){
      this.logginLoading = false;
      return this.myForm.markAllAsTouched();
    }

    console.log({user});

     this.autenticationService.loginRegister(user)
     .pipe(
       catchError(err =>{
         this.logginLoading = false;
         console.log(err.error.msg);
         this.mensajeEmergente(err.status,err.error.msg)
         return throwError(()=>err);
       })
     )
     .subscribe((res : UserLogin ) =>{
       this.logginLoading = false;
       //this.mensajeEmergente(200,res.error.msg);
       localStorage.setItem('token',res.token);
       this.router.navigate(['/lista-productos'])
     })


   }
  }

