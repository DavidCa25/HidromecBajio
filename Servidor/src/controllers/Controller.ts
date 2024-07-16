import { Router } from 'express';

export default abstract class Controller {
  public basePath: string;

  public router: Router;

  public constructor(basePath: string) {
    this.basePath = basePath;
    this.router = Router();
    this.initializeRouter();
  }

  protected abstract initializeRouter(): void;
}
