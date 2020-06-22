"use strict";

import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";
import { Config } from "./environment";
import * as error from "./error";
import * as routes from "./routes";

export function init(appConfig: Config): express.Express {
  const app = express();
  app.set("port", appConfig.port);

  // Habilitar Cors
  app.use(cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true
  }));

  // Si estamos en level debug, loguear los request
  if (appConfig.logLevel == "debug") {
    app.use(morgan("dev"));
  }

  // Configuramos el server para que tome los json correctamente
  app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
  app.use(bodyParser.json({ limit: "5mb" }));

  // Configurar express para comprimir contenidos de text en http
  app.use(compression());

  // helmet le da seguridad al sistema para prevenir hacks
  app.use(helmet.xssFilter());  // Previene inyección de javascript
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.disable("x-powered-by");

  // Iniciamos las rutas del directorio
  // mas sobre rutas http://expressjs.com/es/guide/routing.html
  routes.init(app);

  // Para el manejo de errores, para que los loguee en la consola
  app.use(error.logErrors);

  // Responder con JSON cuando hay un error 404, sino responde con un html
  // Esto tiene que ir al final porque sino nos sobrescribe las otras rutas
  app.use(error.handle404);

  return app;
}
