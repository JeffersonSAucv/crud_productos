import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ListarProductoComponent } from './pages/producto/listar-producto/listar-producto.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainPageComponentComponent } from './pages/main/main-page-component/main-page-component.component';

import { AuthGuard } from './auth.guard';
import { RolGuard } from './rol.guard';
import { Roles } from './enums/rol.enum';
import { UserPageComponent } from './pages/user-page/user-page.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',  // si no se pone path te redirige al listar productos
    pathMatch : 'full'
  },
  {
    path: 'login',
    canActivate: [],
    component: LoginComponent,
  },
  {
    path: 'lista-productos',
    component: ListarProductoComponent,
    canActivate: [AuthGuard, RolGuard],
    data : {
      rol : Roles.ADMIN_ROLE  //"USER_ROL"
    }
    // solo accede el rol que le pasamos
  },
  {
    path: 'main-page',
    component: MainPageComponentComponent,
    canActivate: [AuthGuard],

  },
  {
    path: 'user-page',
    component: UserPageComponent,
    canActivate: [AuthGuard,RolGuard],
    data : {
      rol : Roles.USER_ROLE  //"USER_ROL"
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: []
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  //forRoots rutas principales
  exports: [RouterModule]
})
export class AppRoutingModule {
}
