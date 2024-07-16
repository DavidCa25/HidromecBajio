import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Repository,
    QueryFailedError,
    CreateDateColumn,
    Index,
  } from 'typeorm';
  import DatabaseConnection from '../../database/DatabaseConnection';
  
  @Entity({ name: 'Usuario' })
  export default class Usuario {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    public idUsuario: number;
  
    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    @Index()
    public usuario: string;
  
    @Column({ type: 'varchar', length: 50, nullable: false })
    public contraseña: string;
  
    @Column({ type: 'varchar', length: 50, nullable: false })
    public email: string;
  
    @Column({ type: 'varchar', length: 50, nullable: false })
    public confirmarContraseña: string;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    public imagenPerfil?: string;
  
    @Column({ type: 'varchar', length: 10, nullable: false })
    public rol: string;
  
    @CreateDateColumn({ type: 'datetime', nullable: false })
    public fechaCreacion: Date;
  
    private constructor(
      idUsuario: number | undefined,
      usuario: string,
      contraseña: string,
      email: string,
      confirmarContraseña: string,
      rol: string,
      fechaCreacion: Date,
      imagenPerfil?: string,
    ) {
      this.idUsuario = <number>idUsuario;
      this.usuario = usuario;
      this.contraseña = contraseña;
      this.email = email;
      this.confirmarContraseña = confirmarContraseña;
      this.imagenPerfil = imagenPerfil;
      this.rol = rol;
      this.fechaCreacion = fechaCreacion;
    }

    public static async registrar(
      usuario: string,
      contraseña: string,
      rol: string,
      email: string,
      confirmarContraseña: string,
      imagenPerfil?: string
    ): Promise<Usuario> {

      const repositorioUsuarios = await this.obtenerRepositorioUsuarios();
      const fechaCreacion = new Date();
      const user = new Usuario(
        undefined,
        usuario,
        contraseña,
        confirmarContraseña,
        rol,
        email,
        fechaCreacion,
        imagenPerfil
      );
  
      try {
        await repositorioUsuarios.save(user);
      } catch (e) {
        if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
          throw new Error('ErrorNombreUsuarioDuplicado');
        }
  
        throw e;
      } 
  
      return user;
    }

    public static async getUserByCredential(
      usuario: string,
      contraseña: string
    ): Promise<Usuario> {
      const repositorioUsuarios = await this.obtenerRepositorioUsuarios();
      const usuarioLogin = await repositorioUsuarios.findOneBy({
        usuario,
        contraseña
      })
      if (!usuarioLogin){
        throw new Error('Usuario No Encontrado')
      }
      return usuarioLogin;
    }
    
    private static async obtenerRepositorioUsuarios(): Promise<
    Repository<Usuario>
  > {
    const databaseConnection = await DatabaseConnection.getConnectedInstance();
    return databaseConnection.getRepository(Usuario);
  }
   
}
  