import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ListarProductoComponent } from './pages/producto/listar-producto/listar-producto.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainPageComponentComponent } from './pages/main/main-page-component/main-page-component.component';

import { PrivateGuard } from './private.guard';
import { RolGuard } from './rol.guard';
import { Roles } from './enums/rol.enum';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { PublicGuard } from './public.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'main-page',  // si no se pone path te redirige al listar productos
    pathMatch : 'full'
  },
  {
    path: 'login',
    canActivate: [PublicGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [PublicGuard]
  },
  {
    path: 'lista-productos',
    component: ListarProductoComponent,
    canActivate: [PrivateGuard, RolGuard],
    data : {
      rol : Roles.ADMIN_ROLE  //"USER_ROL"
    }
    // solo accede el rol que le pasamos
  },
  {
    path: 'main-page',
    component: MainPageComponentComponent,
    canActivate: [PrivateGuard],
  },
  {
    path: 'user-page',
    component: UserPageComponent,
    canActivate: [PrivateGuard,RolGuard],
    data : {
      rol : Roles.USER_ROLE  //"USER_ROL"
    }
  },
  {
    path: '**',
    redirectTo: 'login'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  //forRoots rutas principales
  exports: [RouterModule]
})
export class AppRoutingModule {
}
