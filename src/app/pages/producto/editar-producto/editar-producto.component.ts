import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductoService } from 'src/app/service/service.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls : ['./editar-producto.component.css']
})

export class EditarProductoComponent implements OnInit {

  checked = true;
  spinnerLoading = false;
  accion = 'Agregar';

  categorias = [
    {value: '651b6145f1d0c4805c027f41', name: 'Libros'},
    {value: '651749bf911973d6eae8f90e', name: 'Electrodomésticos'},
    {value: '651749b8911973d6eae8f90a', name: 'Bedidas'},
    {value: '651749ad911973d6eae8f906', name: 'Accesorisos de PC'},
    {value: '6516498de8ee3d0d27b4067f', name: 'Galletas'},
  ];

  public myForm : FormGroup = this.fb.group({
    nombre: ['',[Validators.required,Validators.minLength]],
    categoria: ['-1',[Validators.required,Validators.min(1)]],
    precio: [0,[Validators.min(0),Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]],
    descripcion: ['',Validators.minLength(3)],
    fotoUrl: ['',[Validators.required,Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp)$/i)]],
    estado: [false]
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarProductoComponent>,
    public fb : FormBuilder,
    private productoService : ProductoService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    console.log('data', this.data);
    this.esEditar(this.data);
  }

  public esEditar(data: Producto | undefined) {
    if (data !== undefined) {
       this.accion = 'Editar';
       this.myForm.setValue({
         nombre: data.nombre,
         categoria: data.categoria._id,
         precio: data.precio,
         descripcion: data.descripcion,
         estado: data.disponible,
         fotoUrl: data.fotoUrl
       })
    } else {
      this.accion ;
    }
  }


    mensajeEmergente(succes:boolean,mensaje:string,elemento: string){
    this._snackBar.open(succes ?`${mensaje} ${elemento} con éxito.`:`${mensaje}` , '', {
      duration: 4000,
    });
  }
   guardarProducto(){

    if (this.myForm.invalid) {
      return  //si es inválido no retorna nada
    }

     const producto : Producto = {
       //  nombre: this.myForm.value.nombre, <-- otra forma de traer el valor

       nombre: this.myForm.get('nombre')?.value,
       categoria: this.myForm.get('categoria')?.value,
       precio: +this.myForm.get('precio')?.value,
       descripcion: this.myForm.get('descripcion')?.value,
       disponible: this.myForm.get('estado')?.value,
       fotoUrl: this.myForm.get('fotoUrl')?.value

     }
      console.log(producto);
      this.spinnerLoading = true;

     if (this.data === undefined) {


        this.productoService.addProducto(producto).subscribe(()=>{
            this.spinnerLoading = false;
            this.mensajeEmergente(true,'Se agregó el producto', producto.nombre);
            this.dialogRef.close(true);
        },(error)=>{
            this.spinnerLoading = false;
            this.mensajeEmergente(false,error.error.msg,'');
            //this.dialogRef.close(true);
          }
        )


     }else if (this.data._id !== undefined){

      console.log('data edit' ,this.data);
          producto._id = this.data._id;  // senvia id del producto
          this.productoService.updateProducto(producto).subscribe(()=>{
            this.spinnerLoading = false;
            this.mensajeEmergente(true,'Se editó el producto', producto.nombre);
            this.dialogRef.close(true);
        },(error)=>{
            this.spinnerLoading = false;
            this.mensajeEmergente(false,error.error.msg,'');
            //this.dialogRef.close(true);
          }
        )

     } else{
      console.log('nada');

     }



   }
  cancelar() {
    this.dialogRef.close(false);
  }
}
