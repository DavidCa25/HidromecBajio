
import AppBuilder from './appBuilder';
import InventarioController from './controllers/InventarioController';
import ProductoController from './controllers/ProductoController';
import UsuarioController from './controllers/UsuarioController';

const appBuilder = new AppBuilder();

appBuilder.withCors();
appBuilder.withJsonBodyParser();

const usuarioController = new UsuarioController();
const productoController = new ProductoController();
const inventarioController = new InventarioController();

appBuilder.registerController(usuarioController);
appBuilder.registerController(productoController);
appBuilder.registerController(inventarioController);

const app = appBuilder.getApp();

export default app;
