import { DataSource, ObjectLiteral, EntityTarget, Repository } from 'typeorm';
import Usuario from '../models/entities/Usuario';
import Inventario from '../models/entities/Inventario';
import HistorialInventario from '../models/entities/HistorialInventario';
import Pago from '../models/entities/Pago';
import Producto from '../models/entities/Producto';
import Venta from '../models/entities/Venta';
import DetalleVenta from '../models/entities/DetalleVenta';

export default class DatabaseConnection {
  private dataSource: DataSource;

  private static instance: DatabaseConnection;

  private constructor() {
    this.dataSource = new DataSource({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'Hidromec_bajio',
      synchronize: false,
      entities: [Usuario, Inventario, HistorialInventario, Pago, Producto, Venta, DetalleVenta],
    });
  }

  private get isConnected(): boolean {
    return this.dataSource.isInitialized;
  }

  public getRepository<Entity extends ObjectLiteral>(
    entityTarget: EntityTarget<Entity>
  ): Repository<Entity> {
    return this.dataSource.getRepository(entityTarget);
  }

  private async connect(): Promise<void> {
    await this.dataSource.initialize();
  }

  public static async getConnectedInstance(): Promise<DatabaseConnection> {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }

    if (!DatabaseConnection.instance.isConnected) {
      await DatabaseConnection.instance.connect();
      
    }

    return DatabaseConnection.instance;
  }
}
