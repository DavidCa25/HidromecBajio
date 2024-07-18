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
    fechaCreacion?: Date,
    fechaActualizacion: Date
}

export default class ProductoController extends Controller{
    public constructor(){
        super('/producto')
    }
    protected initializeRouter(): void {
        this.router.post('/addProducto', this.registrarProducto)
        this.router.put('/updateProducto/:id', this.actualizarProducto)
        this.router.delete('/deleteProducto/:id', this.eliminar)
    }

    private async registrarProducto(req: Request, res: Response): Promise<void>{
        try{
            const{codigo, producto, descripcion, categoria, precio, cantidad} = <RegistroProductoRequestBody>(
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
                producto: agregarProducto
            });
        }catch(e){
            if (e instanceof Error && e.message === 'ErrorCodigoProductoDuplicado') {
                res.status(HttpStatusCodes.CONFLICT).json({
                  mensaje: 'Ya existe un producto con el mismo código.',
                });
                return;
            }      
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    private async actualizarProducto(req: Request, res: Response): Promise<void>{
    try{
        const{codigo, producto, descripcion, categoria, precio, cantidad} = <RegistroProductoRequestBody>req.body

        if(!codigo || !producto || !descripcion || !categoria || !precio || !cantidad){
            res.status(HttpStatusCodes.BAD_REQUEST).end();
            return
        }

        const id = parseInt(req.params.id);

        const updateProduct = await Producto.buscarPorId(id);
        
        await updateProduct.actualizarProducto(codigo, producto, descripcion, categoria, precio, cantidad);
        res.status(HttpStatusCodes.OK).json({
            mensaje: 'Producto actualizado correctamente.',
            producto: updateProduct 
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

    private async eliminar(req: Request, res: Response): Promise<void> {
        try {
          const id = parseInt(req.params.id);
    
          const producto = await Producto.eliminar(id);
    
          res.status(HttpStatusCodes.OK).json(producto);
        } catch (e) {
          console.error(e);
          res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
      }
}