import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/interfaces/producto.interface';
import { DetalleProductoComponent } from '../detalle-producto/detalle-producto.component';

@Component({
  selector: 'app-card-producto',
  templateUrl: './card-producto.component.html',
  styleUrls: ['./card-producto.component.css']
})
export class CardProductoComponent  {

  @Input() producto!: Producto;

  constructor(
    public dialog: MatDialog ,
  ) { }
  verDetalle(producto?: Producto){
    this.openDialog(producto)
  }

  openDialog(producto? : Producto) {
    // abre el modal para agregar o editar producto
    const dialogRef = this.dialog.open(DetalleProductoComponent, {
      width: '550px',
      disableClose: false,
      data: producto,
    });

    //cuando se cierra actualiza
    dialogRef.afterClosed().subscribe((result : boolean) => {
      console.log('result',result);

      if (result) {
        //this.obtenerProductos();
      }
      console.log('no se agrego o edito');

    });

    console.log('element',producto);

  }



}
