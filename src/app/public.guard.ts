import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacionService} from './service/autenticacion.service';


@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {
  constructor(

    private auteticacionService : AutenticacionService,
    private router : Router
  ) {}

  canActivate() : boolean{

    console.log('verificarSesion()',this.auteticacionService.verificarSesion());

    if(!this.auteticacionService.verificarSesion()){  //no tiene token es false pero negamos el false a true
      return true; //dejame entrar a tu corazon
    }

     this.router.navigate(['/']);
     return false;
  }
}
