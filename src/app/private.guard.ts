import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacionService} from './service/autenticacion.service';


@Injectable({
  providedIn: 'root'
})
export class PrivateGuard implements CanActivate {
  constructor(

    private auteticacionService : AutenticacionService,
    private router : Router
  ) {}

  canActivate() : boolean{
    if(this.auteticacionService.verificarSesion()){
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
