import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    Index,
  } from 'typeorm';
  import Producto from './Producto';
  import Venta from './Venta';
  
  @Entity({ name: 'Inventario' })
  export default class Inventario {
    @PrimaryGeneratedColumn()
    public idInventario: number;
  
    @Column({ type: 'int' })
    public stockMin: number;
  
    @Column({ type: 'int' })
    public stockMax: number;
  
    @ManyToOne(() => Producto)
    @Index()
    public idProducto: Producto;
  
    @ManyToOne(() => Venta)
    @Index()
    public idVenta: Venta;
  
    @CreateDateColumn()
    public fechaEntrada: Date;
  
    constructor(
      idInventario: number | undefined,
      stockMin: number,
      stockMax: number,
      idProducto: Producto,
      idVenta: Venta,
      fechaEntrada: Date
    ) {
      this.idInventario = <number>idInventario;
      this.stockMin = stockMin;
      this.stockMax = stockMax;
      this.idProducto = idProducto;
      this.idVenta = idVenta;
      this.fechaEntrada = fechaEntrada;
    }
  }
  