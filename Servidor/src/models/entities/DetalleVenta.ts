import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Index,
  } from 'typeorm';
  import Venta from './Venta';
  import Producto from './Producto';
  
  @Entity({ name: 'DetalleVenta' })
  export default class DetalleVenta {
    @PrimaryGeneratedColumn()
    public idDetalleVenta: number;
  
    @ManyToOne(() => Venta)
    @Index()
    public idVenta: Venta;
  
    @ManyToOne(() => Producto)
    @Index()
    public idProducto: Producto;
  
    @Column({ type: 'int' })
    public cantidad: number;
  
    @Column({ type: 'int' })
    public precioUnitario: number;
  
    constructor(
      idDetalleVenta: number | undefined,
      idVenta: Venta,
      idProducto: Producto,
      cantidad: number,
      precioUnitario: number
    ) {
      this.idDetalleVenta = <number>idDetalleVenta;
      this.idVenta = idVenta;
      this.idProducto = idProducto;
      this.cantidad = cantidad;
      this.precioUnitario = precioUnitario;
    }
  }
  