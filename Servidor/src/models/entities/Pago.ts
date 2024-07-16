import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
  } from 'typeorm';
  
  @Entity({ name: 'Pago' })
  export default class Pago {
    @PrimaryGeneratedColumn()
    public idPago: number;
  
    @Column({ type: 'varchar', length: 50 })
    @Index()
    public metodoPago: string;
  
    @Column({ type: 'int' })
    public IVA: number;
  
    constructor(idPago: number | undefined, metodoPago: string, IVA: number) {
      this.idPago = <number>idPago;
      this.metodoPago = metodoPago;
      this.IVA = IVA;
    }
  }
  