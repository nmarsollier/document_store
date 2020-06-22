"use strict";

import * as error from "../server/error";
import * as redis from "../server/redis";
import { Resource } from "./schema";

export async function create(path: string, body: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    validateCreate(body)
      .then(body => {
        const res: Resource = {
          id: path,
          resource: JSON.stringify(body)
        };

        redis.setRedisDocument(path, res.resource)
          .then(id => resolve(id))
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
}

function validateCreate(body: string): Promise<string> {
  const result: error.ValidationErrorMessage = {
    messages: []
  };

  if (!body) {
    result.messages.push({ path: "body", message: "No puede quedar vacío." });
  }

  if (result.messages.length > 0) {
    return Promise.reject(result);
  }

  return Promise.resolve(body);
}
