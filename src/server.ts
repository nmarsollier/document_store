"use strict";

import * as env from "./server/environment";
import { Config } from "./server/environment";
import * as express from "./server/express";


// Variables de entorno
const conf: Config = env.getConfig(process.env);

// Mejoramos el log de las promesas
process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
});

// Se configura e inicia express
const app = express.init(conf);

app.listen(conf.port, () => {
  console.log(`Object Store Local Server : ${conf.port}`);
});

module.exports = app;
