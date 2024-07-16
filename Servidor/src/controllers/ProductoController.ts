import { Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Producto from '../models/entities/Producto';
import Controller from './Controller';

interface RegistroProductoRequestBody{
    codigo: string,
    producto: string,
    descripcion: string,
    categoria: string,
    precio: number,
    cantidad: number,
    fechaCreacion: Date,
    fechaActualizacion: Date
}

export default class ProductoController extends Controller{
    public constructor(){
        super('/producto')
    }
    protected initializeRouter(): void {
        this.router.post('/addProducto', this.registrarProducto)
    }

    private async registrarProducto(req: Request, res: Response): Promise<void>{
        try{
            const{codigo, producto, descripcion, categoria, precio, cantidad, fechaCreacion, fechaActualizacion} = <RegistroProductoRequestBody>(
                req.body
            );
            if(!codigo || !producto || !descripcion || !categoria || !precio || !cantidad){
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return
            }

            const agregarProducto = Producto.registrarProducto(
                codigo, 
                producto,
                descripcion,
                categoria,
                precio,
                cantidad
            );

            res.status(HttpStatusCodes.CREATED).json({
                mensaje: 'Producto registrado correctamente.',
                
            });
        }catch(e){
            if (e instanceof Error && e.message === 'ErrorCodigoUsuarioDuplicado') {
                res.status(HttpStatusCodes.CONFLICT).json({
                  mensaje: 'Ya existe un producto con el mismo código.',
                });
                return;
            }      
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
}