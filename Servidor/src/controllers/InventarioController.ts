import { Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Inventario from '../models/entities/Inventario';
import Controller from './Controller';
import Producto from '../models/entities/Producto';
import Venta from '../models/entities/Venta';

interface modificarInventario{
    idProducto: Producto,
    stockMin: number,
    stockMax: number,
    cantidad: number,
    fechaEntrada: Date
}

export default class InventarioController extends Controller{
    public constructor(){
        super('/inventario')
    }
    protected initializeRouter():void {
        this.router.put('/actualizar/:id', this.actualizarProductoInventario);
        this.router.get('/', this.consultarTodos);
    }

    private async consultarTodos(req: Request, res: Response): Promise<void> {
        try {
          const inventario = await Inventario.consultarTodos();
    
          res.status(HttpStatusCodes.OK).json(inventario);
        } catch (e) {
          console.error(e);
          res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
      }

    private async actualizarProductoInventario(req: Request, res: Response): Promise<void>{
        try{
            const{idProducto, stockMin, stockMax, cantidad} = <modificarInventario>req.body
    
            if(!idProducto || !stockMin || !stockMax || !cantidad){
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return
            }
    
            const id = parseInt(req.params.id);
    
            const updateProductoInventario = await Inventario.buscarPorId(id);
            
            await updateProductoInventario.actualizarInventario(idProducto, stockMin, stockMax, cantidad);

            res.status(HttpStatusCodes.OK).json({
                mensaje: 'Producto actualizado correctamente.',
                producto: updateProductoInventario
            });
    
            
            } catch (e) {
            if (e instanceof Error && e.message === 'ErrorProductoNoEncontrado') {
                res.status(HttpStatusCodes.NOT_FOUND).end();
                return;
            }
    
            if (e instanceof Error && e.message === 'ErrorProductoDuplicado') {
                res
                .status(HttpStatusCodes.CONFLICT)
                .json({ mensaje: 'Ya existe un producto con el mismo código.' });
                return;
            }
    
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
            }
        }
}