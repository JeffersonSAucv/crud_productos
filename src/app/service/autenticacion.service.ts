import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserLogin, UserAuth, UsuarioLoggedIn } from '../interfaces/login.interface';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private myAppUrl :string;
  private myApiUrl :string;
  private myApiRegisterUrl :string;

  constructor( private http : HttpClient, private router : Router) {

    this.myAppUrl = environment.url
    this.myApiUrl = 'api/auth'
    this.myApiRegisterUrl = 'api/usuarios';

   }

  //metoodo para login
  loginAuth(login : UserAuth): Observable<UserLogin>{

    return this.http.post<UserLogin>(`${this.myAppUrl}${this.myApiUrl}`,login)
  }

   //metoodo para login
   loginRegister(login : UserAuth): Observable<UserLogin>{

    return this.http.post<UserLogin>(`${this.myAppUrl}${this.myApiRegisterUrl}`,login)
  }


  // validar sesion si hay un token
  verificarSesion(){

    if(localStorage.getItem('token')){

      return true;
    }else{
      return false;
    }
  }

  getToken(){
    console.log('obtuve token',localStorage.getItem('token'));

    return localStorage.getItem('token');
  }

  // el partial convierte todas las propiedades en opcionales
  //Partial<Interface>
  getDataUser() : UsuarioLoggedIn{
    const data =  localStorage.getItem('userSesion')
    // Lo contrario del stringyfy es el parse
    const dataJson =  JSON.parse(data!)
    return dataJson
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('userSesion');
    this.router.navigate(['/login']);

  }

}
