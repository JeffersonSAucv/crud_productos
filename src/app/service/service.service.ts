import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Producto } from '../interfaces/producto.interface';
import { ProductoResponse } from '../interfaces/producto-response.interface';
import { TokenInterceptorService } from './token-interceptor.service';
import { AutenticacionService } from './autenticacion.service';
import { Portal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private myAppUrl :string;
  private myApiUrl :string;



  constructor(private http: HttpClient, private autenticacionService : AutenticacionService) {

    this.myAppUrl = environment.url;
    this.myApiUrl = 'api/productos';


  }
  cabecera : { }= {headers: {'Content-Type': 'application/json','x-token': `${this.autenticacionService.getToken()}`}}
  getProductos(): Observable<Producto[]> {
    return this.http.get<ProductoResponse>(`${this.myAppUrl}${this.myApiUrl}?limite=100`).pipe(

      switchMap(data => {
        return of(data.producto);  // retorna observable de array de productos
      })
    )
  }

  deleteProducto(id?: string): Observable<void> {  // con el id ? le digo que siempre voy a recibir un id
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`,this.cabecera);
  }

  addProducto(producto : Producto):Observable<void>{
    //const token : string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NGZlNTRlYTdjNWEwMTVlNmJmMTAzMmIiLCJvY3VsdG8iOiJlbGxhIG5vIHRlIGFtYSB1dSIsImlhdCI6MTY5NzI0Njc1MSwiZXhwIjoxNjk3MjYxMTUxfQ.rkRr75LFPBu5h1tBmvTm2RYEo8UQPydKh2eCrDvfGjI";

    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,producto,this.cabecera)
  }

  updateProducto(producto : Producto) : Observable<void>{
    console.log('service',producto._id);

    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${producto._id}`,producto,this.cabecera)
  }



}
