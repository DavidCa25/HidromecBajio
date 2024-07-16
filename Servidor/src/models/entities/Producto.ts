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
  
  @Entity({ name: 'Producto' })
  export default class Producto {
    @PrimaryGeneratedColumn()
    public idProducto: number;
  
    @Column({ type: 'varchar', length: 150 })
    @Index()
    public codigo: string;
  
    @Column({ type: 'varchar', length: 150 })
    @Index()
    public producto: string;
  
    @Column({ type: 'varchar', length: 150, nullable: true })
    public descripcion: string;
  
    @Column({ type: 'varchar', length: 50 })
    @Index()
    public categoria: string;
  
    @Column({ type: 'int' })
    public precio: number;
  
    @Column({ type: 'int' })
    public cantidad: number;
  
    @CreateDateColumn()
    public fechaCreacion: Date;
  
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
      fechaCreacion: Date,
      fechaActualizacion: Date
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
      cantidad: number,
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
      try{
        await repositorioProducto.save(newProducto);
      }catch(e){
        if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
          throw new Error('ErrorNombreUsuarioDuplicado');
        }
  
        throw e;
      }
      return newProducto
    }
    
    private static async obtenerRepositorioProductos(): Promise<Repository<Producto>> {
    const databaseConnection = await DatabaseConnection.getConnectedInstance();
    return databaseConnection.getRepository(Producto);
  }
  }
  