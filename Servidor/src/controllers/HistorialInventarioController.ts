import { Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import HistorialInventario from '../models/entities/HistorialInventario';
import Controller from './Controller';
import Producto from '../models/entities/Producto';

interface RegistroInventarioRequestBody {
    idProducto: Producto,
    cantidad: number,
    tipoMovimiento: 'entrada' | 'salida'
}

export default class HistorialInventarioController extends Controller {
    public constructor() {
        super('/historialInventario');
    }

    protected initializeRouter(): void {
        this.router.post('/registrar', this.registrarMovimiento);
        this.router.get('/', this.consultarTodos);
    }

    public async registrarMovimiento(req: Request, res: Response): Promise<void> {
        try {
            const { idProducto, cantidad, tipoMovimiento } = <RegistroInventarioRequestBody>req.body;
            if (!idProducto || !cantidad || !tipoMovimiento) {
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }

            await HistorialInventario.registrarMovimiento(idProducto, cantidad, tipoMovimiento);

            res.status(HttpStatusCodes.CREATED).json({
                mensaje: 'Movimiento registrado correctamente.',
            });
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    private async consultarTodos(req: Request, res: Response): Promise<void> {
        try {
            const historial = await HistorialInventario.consultarTodos();
            res.status(HttpStatusCodes.OK).json(historial);
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
}
