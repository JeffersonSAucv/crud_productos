import { Usuario } from "./producto.interface";

export interface UserAuth{
  nombre? : string
  correo : string,
  password :string,
  rol? : string
}


export interface UserLogin {
  token : string,
  usuario : UsuarioLoggedIn
}

export interface UsuarioLoggedIn {
  correo : string,
  estado : boolean,
  id : string,
  rol : string,
  nombre : string
}
