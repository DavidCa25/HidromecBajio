import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
  Repository,
  QueryFailedError,
  JoinColumn,
} from 'typeorm';
import Producto from './Producto';
import DatabaseConnection from '../../database/DatabaseConnection';

@Entity({ name: 'HistorialInventario' })
export default class HistorialInventario {
  @PrimaryGeneratedColumn()
  public idHistorial: number;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'idProducto' })
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

  public static async registrarMovimiento(
      idProducto: Producto,
      cantidad: number,
      tipoMovimiento: 'entrada' | 'salida'
  ): Promise<HistorialInventario> {
      const repositorioHistorial = await HistorialInventario.obtenerRepositorioHistorial();
      const fechaMovimiento = new Date();

      const nuevoMovimiento = new HistorialInventario(
          undefined,
          idProducto,
          cantidad,
          tipoMovimiento,
          fechaMovimiento
      );
      try {
          await repositorioHistorial.save(nuevoMovimiento);
      } catch (e) {
          if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
              throw new Error('ErrorNombreUsuarioDuplicado');
          }
          throw e;
      }
      return nuevoMovimiento;
  }

  public static async consultarTodos(): Promise<HistorialInventario[]> {
      const repositorioHistorial = await HistorialInventario.obtenerRepositorioHistorial();
      return repositorioHistorial.find();
  }

  public static async obtenerRepositorioHistorial(): Promise<Repository<HistorialInventario>> {
      const databaseConnection = await DatabaseConnection.getConnectedInstance();
      return databaseConnection.getRepository(HistorialInventario);
  }
}
