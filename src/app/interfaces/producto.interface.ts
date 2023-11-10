export interface Producto {
     _id? : string,
     nombre : string,
     estado? : boolean,
     usuario?: string,
     precio? : number,
     categoria : Categoria,
     descripcion?: string,
     disponible : boolean,
     fotoUrl? : string
}

export interface Categoria {
  _id? : string,
  nombre : string
}

export interface Usuario {
  _id: string,
  nombre :string
}
