import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//components

import { AppComponent } from './app.component';
import { ListarProductoComponent } from './pages/producto/listar-producto/listar-producto.component';
import { EditarProductoComponent } from './pages/producto/editar-producto/editar-producto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//modulos
import { SharedModule } from './shared/shared.module';
import { DialogEliminarComponent } from './pages/components/dialog-eliminar.component';
import { LoginComponent } from './pages/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { NavBarComponent } from './pages/components/navBar/nav-bar.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainPageComponentComponent } from './pages/main/main-page-component/main-page-component.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { CardProductoComponent } from './pages/main/card-producto/card-producto.component';
import { DetalleProductoComponent } from './pages/main/detalle-producto/detalle-producto.component';
import { SidebarComponent } from './pages/components/sideBar/sidebar.component';




@NgModule({
  declarations: [
    AppComponent,
    ListarProductoComponent,
    EditarProductoComponent,
    DialogEliminarComponent,
    LoginComponent,
    NavBarComponent,
    RegisterComponent,
    MainPageComponentComponent,
    UserPageComponent,
    MainPageComponentComponent,
    CardProductoComponent,
    DetalleProductoComponent,
    SidebarComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
