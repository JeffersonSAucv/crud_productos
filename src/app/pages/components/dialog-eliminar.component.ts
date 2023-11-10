import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductoDelete } from '../../interfaces/producto-delete.interface';

@Component({
  selector: 'app-dialog-eliminar',
  templateUrl: './dialog-eliminar.component.html'
})

export class DialogEliminarComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogEliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductoDelete // recibimos el producto - en este caso es interface ProductoDelelte
  ) {}

  // actionModal(confirmado: boolean): void {
  //   this.dialogRef.close(confirmado);
  // }

  ngOnInit() {

  }
}
