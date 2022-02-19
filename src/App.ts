import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as path from "path";
import { internalServerError, notFound } from './exceptions';
import routes from './routes';
import config from './config/app';
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
    'DELETE',
    'PATCH'
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};
class App {
  public express: express.Application;
  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
  }

  private setMiddlewares(): void {
    this.express.use(cors(corsOpts));
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json());
    this.express.use(express.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(`/${config.IMAGE_PATH}`, express.static(path.join(process.cwd(), `public/${config.IMAGE_PATH}`)));
    this.express.use(helmet());
  }
  private setRoutes(): void {
    this.express.use('/api/v1', routes);
  }
  private catchErrors(): void {
    this.express.use(notFound);
    this.express.use(internalServerError);
  }
}

export default new App().express;
