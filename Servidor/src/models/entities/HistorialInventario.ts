import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    Index,
  } from 'typeorm';
  import Producto from './Producto';
  
  @Entity({ name: 'HistorialInventario' })
  export default class HistorialInventario {
    @PrimaryGeneratedColumn()
    public idHistorial: number;
  
    @ManyToOne(() => Producto)
    @Index()
    public idProducto: Producto;
  
    @Column({ type: 'int' })
    public cantidad: number;
  
    @Column({ type: 'enum', enum: ['entrada', 'salida'] })
    public tipoMovimiento: string;
  
    @CreateDateColumn()
    @Index()
    public fechaMovimiento: Date;
  
    constructor(
      idHistorial: number | undefined,
      idProducto: Producto,
      cantidad: number,
      tipoMovimiento: 'entrada' | 'salida',
      fechaMovimiento: Date
    ) {
      this.idHistorial = <number>idHistorial;
      this.idProducto = idProducto;
      this.cantidad = cantidad;
      this.tipoMovimiento = tipoMovimiento;
      this.fechaMovimiento = fechaMovimiento;
    }
  }
  