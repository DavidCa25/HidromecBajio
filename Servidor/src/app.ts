
import AppBuilder from './appBuilder';
import ProductoController from './controllers/ProductoController';
import UsuarioController from './controllers/UsuarioController';

const appBuilder = new AppBuilder();

appBuilder.withCors();
appBuilder.withJsonBodyParser();

const usuarioController = new UsuarioController();
const productoController = new ProductoController();

appBuilder.registerController(usuarioController);
appBuilder.registerController(productoController);

const app = appBuilder.getApp();

export default app;
