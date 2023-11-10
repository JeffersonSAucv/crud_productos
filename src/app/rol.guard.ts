import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from './service/autenticacion.service';
import { Roles } from './enums/rol.enum';

// export const rolGuard: CanActivateFn = (route, state) => {
//   return true;
// };



@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  constructor(
    private autenticacionService : AutenticacionService,
    private router : Router
  ) {}

  canActivate(next : ActivatedRouteSnapshot) {
    const {rol} = next.data;
    console.log('log desde guard',this.autenticacionService.getDataUser().rol);
    // rol = "ADMIN_ROL"
    if (rol === this.autenticacionService.getDataUser().rol ) {
      return true
    }




    this.router.navigate(['/main-page']);
    return false;


  }
}
