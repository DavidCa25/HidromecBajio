import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
  Repository,
  QueryFailedError,
  JoinColumn
} from 'typeorm';
import Producto from './Producto';
import Venta from './Venta';
import DatabaseConnection from '../../database/DatabaseConnection';

@Entity({ name: 'Inventario' })
export default class Inventario {
  @PrimaryGeneratedColumn()
  public idInventario: number;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'idProducto' })  // Especificar el nombre correcto de la columna aquí
  public idProducto: Producto;

  @Column({ type: 'int' })
  public stockMin: number;

  @Column({ type: 'int' })
  public stockMax: number;

  @Column({ type: 'int' })
  public cantidad: number;

  @CreateDateColumn()
  public fechaEntrada: Date;

  constructor(
    idInventario: number | undefined,
    idProducto: Producto,
    stockMin: number,
    stockMax: number,
    cantidad: number,
    fechaEntrada: Date,
  ) {
    this.idInventario = <number>idInventario;
    this.idProducto = idProducto;
    this.stockMin = stockMin;
    this.stockMax = stockMax;
    this.cantidad = cantidad;
    this.fechaEntrada = fechaEntrada;
  }

  public async actualizarInventario(
    idProducto: Producto,
    stockMin: number,
    stockMax: number,
    cantidad: number,
  ): Promise<void> {
    this.idProducto = idProducto;
    this.stockMin = stockMin;
    this.stockMax = stockMax;
    this.cantidad = cantidad;
    const repositorioInventario = await Inventario.obtenerRepositorioInventario();
    try {
      await repositorioInventario.save(this);
    } catch (e) {
      if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
        throw new Error('ErrorProductoDuplicado');
      }
      throw e;
    }
  }

  public static async buscarPorId(idInventario: number): Promise<Inventario> {
    const repositorioInventario = await Inventario.obtenerRepositorioInventario();
    const inventario = await repositorioInventario.findOne({});

    if (!inventario) {
      throw new Error('ErrorProductoNoEncontrado');
    }

    return inventario;
  }

  public static async consultarTodos(): Promise<Inventario[]> {
    const repositorioInventario = await Inventario.obtenerRepositorioInventario();
    return repositorioInventario.find();
  }

  public static async obtenerRepositorioInventario(): Promise<Repository<Inventario>> {
    const databaseConnection = await DatabaseConnection.getConnectedInstance();
    return databaseConnection.getRepository(Inventario);
  }
}
