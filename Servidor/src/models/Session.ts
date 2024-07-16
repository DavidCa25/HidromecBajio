import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Usuario from './entities/Usuario';

export default class Sesion {
  public tokenSesion: string;

  private static readonly secret = 'I have a baaaaad feeling about this.';

  private constructor(tokenSesion: string) {
    this.tokenSesion = tokenSesion;
  }

  public static crearParaUsuario(usuario: Usuario): Sesion {
    const data = {
      idUsuario: usuario.idUsuario,
      usuario: usuario.usuario,
      email: usuario.email,
    };

    const tokenSesion = jwt.sign({ data }, Sesion.secret, { expiresIn: '1d' });

    return new Sesion(tokenSesion);
  }

  public static verificarTokenSesion(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    try {
      const tokenSesion = <string>req.headers['Token-Sesion'.toLowerCase()];

      if (!tokenSesion) {
        res.status(HttpStatusCodes.UNAUTHORIZED).json({
          mensaje: 'No se envio token de sesion.',
        });
        return;
      }

      jwt.verify(tokenSesion, Sesion.secret);

      next();
    } catch (e) {
      console.error(e);
      res.status(HttpStatusCodes.UNAUTHORIZED).json({
        mensaje: 'Token de sesion es invalido o ha expirado.',
      });
    }
  }
}
