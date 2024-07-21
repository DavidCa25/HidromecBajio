import { Producto } from "./producto";

export class Inventario{
    idProducto: Producto;
    stockMin: number;
    stockMax: number;
    cantidad: number;
    fechaEntrada?: Date;

    public constructor(_idProducto: Producto, _stockMin: number, _stockMax: number, _cantidad: number, _fechaEntrada: Date){
        this.idProducto = _idProducto,
        this.stockMin = _stockMin,
        this.stockMax = _stockMax,
        this.cantidad = _cantidad,
        this.fechaEntrada = _fechaEntrada;
    }   
}