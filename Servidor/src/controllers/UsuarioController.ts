import { Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Usuario from '../models/entities/Usuario';
import Controller from './Controller';

interface RegistroRequestBody{
    usuario: string,
    contraseña: string,
    rol: string,
    email: string,
    confirmarContraseña: string,
    imagenPerfil?: string
}

interface LoginRequestBody{
    usuario: string,
    contraseña: string
}

export default class UsuarioController extends Controller {
    public constructor(){
        super('/auth');
    }
    protected initializeRouter(): void {
        this.router.post('/registro', this.registro);
        this.router.post('/iniciarSesion', this.login);
    }

    private async registro(req: Request, res: Response): Promise<void>{
        try{
            const { usuario, contraseña, confirmarContraseña, rol, email, imagenPerfil} = <RegistroRequestBody>(
                req.body
            );
            if(!usuario || !contraseña || !confirmarContraseña || !rol || !email ){
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return
            }

            if (contraseña !== confirmarContraseña) {
              res.status(HttpStatusCodes.BAD_REQUEST).json({
                  mensaje: 'La contraseña y la confirmación no coinciden.'
              });
              return;
          }

            const newUser = await Usuario.registrar(
                usuario, 
                contraseña, 
                confirmarContraseña, 
                rol, 
                email,
                imagenPerfil
            );

            res.status(HttpStatusCodes.CREATED).json({
              mensaje: 'Usuario registrado correctamente.',
              usuario: newUser 
          });

        }catch(e){
            if (e instanceof Error && e.message === 'ErrorNombreUsuarioDuplicado') {
                res.status(HttpStatusCodes.CONFLICT).json({
                  mensaje: 'Ya existe un usuario con el mismo nombre de usuario.',
                });
                return;
            }
        
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }


    private async login(req: Request, res: Response): Promise<void> {
        try {
          const { usuario, contraseña } = <LoginRequestBody>req.body;
    
          if (!usuario || !contraseña) {
            res.status(HttpStatusCodes.BAD_REQUEST).end();
            return;
          }
    
          const usuarioLogin = await Usuario.getUserByCredential(
            usuario,
            contraseña
          );

          res.status(HttpStatusCodes.CREATED).json({
            mensaje: 'Usuario inició sesión correctamente.',
            usuario: usuarioLogin
        });
    
      
        } catch (e) {
          if (e instanceof Error && e.message === 'ErrorUsuarioNoEncontrado') {
            res.status(HttpStatusCodes.UNAUTHORIZED).end();
            return;
          }
    
          console.error(e);
          res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
      }
    }