export class Producto{
    idProducto?: number;
    codigo: number;
    producto: string;
    descripcion: string;
    categoria: string;
    precio: number;
    cantidad: number;
;

    public constructor(_codigo: number, _producto: string, _descripcion: string, _categoria: string, _precio: number, _cantidad: number, _idProducto?: number){
        this.codigo = _codigo;
        this.producto = _producto;
        this.descripcion = _descripcion;
        this.categoria = _categoria;
        this.precio = _precio;
        this.cantidad = _cantidad;
        if (_idProducto !== undefined) {
            this.idProducto = _idProducto;
          }
    }
}