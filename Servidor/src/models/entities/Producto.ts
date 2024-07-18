import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    Repository,
    QueryFailedError,
  } from 'typeorm';
  import DatabaseConnection from '../../database/DatabaseConnection';
import HistorialInventario from './HistorialInventario';
import Inventario from './Inventario';
  
  @Entity({ name: 'Producto' })
  export default class Producto {
    @PrimaryGeneratedColumn()
    public idProducto: number;
  
    @Column({ type: 'varchar', length: 150, unsigned: true, unique: true})
    @Index()
    public codigo: string;
  
    @Column({ type: 'varchar', length: 150, nullable: true })
    @Index()
    public producto: string;
  
    @Column({ type: 'varchar', length: 150, nullable: true })
    public descripcion: string;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    @Index()
    public categoria: string; 
  
    @Column({ type: 'int', nullable: true })
    public precio: number;
  
    @Column({ type: 'int', nullable: true })
    public cantidad: number;
  
    @CreateDateColumn()
    public fechaCreacion?: Date;
  
    @UpdateDateColumn()
    public fechaActualizacion: Date;
  
    constructor(
      idProducto: number | undefined,
      codigo: string,
      producto: string,
      descripcion: string | null,
      categoria: string,
      precio: number,
      cantidad: number,    
      fechaActualizacion: Date,
      fechaCreacion?: Date,
    ) {
      this.idProducto = <number>idProducto;
      this.codigo = codigo;
      this.producto = producto;
      this.descripcion = descripcion || '';
      this.categoria = categoria;
      this.precio = precio;
      this.cantidad = cantidad;
      this.fechaCreacion = fechaCreacion;
      this.fechaActualizacion = fechaActualizacion;
    }

    public static async registrarProducto(
      codigo: string, 
      producto: string,
      descripcion: string,
      categoria: string,
      precio: number,
      cantidad: number
    ): Promise<Producto>{
      const repositorioProducto = await this.obtenerRepositorioProductos();
      const fechaCreacion = new Date();
      const fechaActualizacion = new Date();
      const newProducto = new Producto(
        undefined, 
        codigo,
        producto,
        descripcion,
        categoria,
        precio,
        cantidad,
        fechaCreacion,
        fechaActualizacion        
      );
      try {
        await repositorioProducto.save(newProducto);
  
        
        const inventario = new Inventario(
          undefined,
          newProducto,
          0, 
          100, 
          cantidad,
          new Date()
        );
        await Inventario.obtenerRepositorioInventario().then(repo => repo.save(inventario));
  
        
        const historialInventario = new HistorialInventario(
          undefined,
          newProducto,
          cantidad,
          'entrada',
          new Date()
        );
        await HistorialInventario.obtenerRepositorioHistorial().then(repo => repo.save(historialInventario));
  
      } catch (e) {
        if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
          throw new Error('ErrorNombreUsuarioDuplicado');
        }
        throw e;
      }
      return newProducto;
    }

    public async actualizarProducto(
      codigo: string, 
      producto: string,
      descripcion: string,
      categoria: string,
      precio: number,
      cantidad: number
    ): Promise<void> {
      
      this.codigo = codigo;
      this.producto = producto;
      this.descripcion = descripcion;
      this.categoria = categoria;
      this.precio = precio;
      this.cantidad = cantidad;
      this.fechaActualizacion = new Date();
      const repositorioProducto = await Producto.obtenerRepositorioProductos();

      try {
        await repositorioProducto.save(this);
      } catch (e) {
        if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
          throw new Error('ErrorProductoDuplicado');
        }
        throw e;
      }
    }
    

    public static async buscarPorId(idProducto: number): Promise<Producto> {
      const repositorioUsuarios = await Producto.obtenerRepositorioProductos();
  
      const producto = await repositorioUsuarios.findOneBy({ idProducto });
  
      if (!producto) {
        throw new Error('ErrorProductoNoEncontrado');
      }
  
      return producto;
    }
    
    private static async obtenerRepositorioProductos(): Promise<Repository<Producto>> {
    const databaseConnection = await DatabaseConnection.getConnectedInstance();
    return databaseConnection.getRepository(Producto);
    }

    public static async eliminar(id: number): Promise<void> {
      const repositorioUsuarios = await Producto.obtenerRepositorioProductos();
      await repositorioUsuarios.delete(id);
    }
  
  }
  