import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    Index,
  } from 'typeorm';
  import Usuario from './Usuario';
  import Producto from './Producto';
  import Pago from './Pago';
  
  @Entity({ name: 'Venta' })
  export default class Venta {
    @PrimaryGeneratedColumn()
    public idVenta: number;
  
    @ManyToOne(() => Producto)
    @Index()
    public idProducto: Producto;
  
    @ManyToOne(() => Usuario)
    @Index()
    public idUsuario: Usuario;
  
    @ManyToOne(() => Pago)
    @Index()
    public idMetodoPago: Pago;
  
    @Column({ type: 'int' })
    public monto: number;
  
    @CreateDateColumn()
    @Index()
    public fechaVenta: Date;
  
    @Column({ type: 'int' })
    public totalVentas: number;
  
    @Column({ type: 'int' })
    public cantidad: number;
  
    @Column({ type: 'int', nullable: true })
    public descuento: number;
  
    @Column({ type: 'varchar', length: 50, default: 'completada' })
    public estadoVenta: string;
  
    constructor(
      idVenta: number | undefined,
      idProducto: Producto,
      idUsuario: Usuario,
      idMetodoPago: Pago,
      monto: number,
      fechaVenta: Date,
      totalVentas: number,
      cantidad: number,
      descuento: number | null,
      estadoVenta: string
    ) {
      this.idVenta = <number>idVenta;
      this.idProducto = idProducto;
      this.idUsuario = idUsuario;
      this.idMetodoPago = idMetodoPago;
      this.monto = monto;
      this.fechaVenta = fechaVenta;
      this.totalVentas = totalVentas;
      this.cantidad = cantidad;
      this.descuento = descuento || 0;
      this.estadoVenta = estadoVenta;
    }
  }
  