"use strict";

import * as express from "express";
import { Express } from "express";
import * as resource from "../resource";
import * as error from "./error";

export function init(app: Express) {
  app.route("*").put(create);

  app.route("*").get(find);
}

function create(req: express.Request, res: express.Response) {
  resource.create(req.path, req.body)
    .then(id => res.json({ id: id }))
    .catch(err => error.handle(res, err));
}

function find(req: express.Request, res: express.Response) {
  if (req.query.list == "true") {
    search(req, res);
  } else {
    findById(req, res);
  }
}

function search(req: express.Request, res: express.Response) {
  const id = req.path;
  resource.findKeysById(id)
    .then(d => res.json(d))
    .catch(err => error.handle(res, err));
}

function findById(req: express.Request, res: express.Response) {
  const id = req.path;
  resource.findById(id)
    .then(d => res.json(JSON.parse(d.resource)))
    .catch(err => error.handle(res, err));
}
