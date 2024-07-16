import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import bodyParser from 'body-parser';
import Controller from './controllers/Controller';

export default class AppBuilder {
  private app: Application;

  public constructor() {
    this.app = express();
  }

  public getApp(): Application {
    return this.app;
  }

  public registerController(controller: Controller): AppBuilder {
    const { basePath, router } = controller;
    this.app.use(basePath, router);
    return this;
  }

  public withCors(corsOptions?: CorsOptions): AppBuilder {
    this.app.use(cors(corsOptions));
    return this;
  }

  public withJsonBodyParser(): AppBuilder {
    this.app.use(bodyParser.json());
    return this;
  }
}
