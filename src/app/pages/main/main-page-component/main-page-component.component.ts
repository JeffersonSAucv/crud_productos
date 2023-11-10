import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../service/service.service';
import { Producto } from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-main-page-component',
  templateUrl: './main-page-component.component.html',
  styleUrls: ['./main-page-component.component.css']
})
export class MainPageComponentComponent implements OnInit {

  productosList : Producto [] = [];
  ngOnInit(): void {
    this.listarProductos()
  }
  constructor(
    private productoService : ProductoService
  ) {}

  listarProductos(){
    this.productoService.getProductos().subscribe(
      data=>{
        this.productosList = data
      }
    )
  }



}
