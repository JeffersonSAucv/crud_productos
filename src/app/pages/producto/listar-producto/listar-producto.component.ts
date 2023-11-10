import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Producto } from '../../../interfaces/producto.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EditarProductoComponent } from '../editar-producto/editar-producto.component';
import { ProductoService } from '../../../service/service.service';
import { DialogEliminarComponent } from '../../components/dialog-eliminar.component';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductoComponent  implements AfterViewInit, OnInit{

  displayedColumns: string[] = ['nombre','categoria' ,'disponible', 'precio','descripcion','acciones'];
  dataSource: MatTableDataSource<Producto>;
  loadingBar : boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog ,
    private _productoService : ProductoService,
    private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.obtenerProductos();
  }


  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  nuevoRegistro() {
    console.log('nuevo registro');
    this.openDialog();
  }

  editarRegistro(element : Producto) {
    console.log('editando registro');
    this.openDialog(element);
  }

  openDialog(element? : Producto) {
    // abre el modal para agregar o editar producto
    const dialogRef = this.dialog.open(EditarProductoComponent, {
      width: '550px',
      disableClose: true,
      data: element,
    });

    //cuando se cierra actualiza
    dialogRef.afterClosed().subscribe((result : boolean) => {
      console.log('result',result);

      if (result) {
        this.obtenerProductos();
      }
      console.log('no se agrego o edito');

    });
  }

  mensajeEmergente(mensaje:string,elemento: string){
    this._snackBar.open(`${mensaje} ${elemento} con éxito.`, '', {
      duration: 2000,
    });
  }

  obtenerProductos(){
    this.loadingBar = true;
    this._productoService.getProductos().subscribe(data =>{
      this.loadingBar = false;
      console.log(data);
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deleteProducto(producto: Producto){

    this.loadingBar = true; // activamos el laoader

    const dialogRef = this.dialog.open(DialogEliminarComponent, {
      data: { producto: producto },
    });   // abrimos el dialog para preguntar si se quiere eliminar y enviamos el producto

    dialogRef.afterClosed().subscribe((confirmado: boolean) => { //si es que se da click en eliminar cambia a true si se cierra false
      this.loadingBar = false;
      if (confirmado) {
        this._productoService.deleteProducto(producto._id).subscribe(()=>{
          this.obtenerProductos();
          this.mensajeEmergente('Se elimino el producto:',producto.nombre);
        })

        console.log('se eliminó el producto');

      }
    });
  }






}
