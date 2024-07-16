export class User{
    idUsuario?: number;
    usuario: string;
    contraseña: string;
    confirmarContraseña: string;
    email: string;
    rol: string;
    imagenPerfil?: string

    public constructor(_usuario: string, _contraseña: string, _confirmarContraseña: string, _email: string, _rol: string, _imagenPerfil: string){
        this.usuario = _usuario
        this.contraseña = _contraseña,
        this.confirmarContraseña = _confirmarContraseña,
        this.email = _email,
        this.rol = _rol,
        this.imagenPerfil = _imagenPerfil
    }
}