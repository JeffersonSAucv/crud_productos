import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/service/autenticacion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']

})

export class NavBarComponent implements OnInit {
  botonActive = true;
  constructor(
    private autenticacionService : AutenticacionService
  ) { }

  ngOnInit() { }

   get getNameUser(){
    return this.autenticacionService.getDataUser().nombre;

  }

  cerrarSesion() : void{
    this.autenticacionService.cerrarSesion();
  }


}
