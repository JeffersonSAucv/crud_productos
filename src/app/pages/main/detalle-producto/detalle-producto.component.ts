import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})

export class DetalleProductoComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public producto: Producto,
  ) { }

  ngOnInit() { }
}
