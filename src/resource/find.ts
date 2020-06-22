"use strict";

import * as redis from "../server/redis";
import { Resource } from "./schema";

export async function findKeysById(id: string): Promise<string[]> {
  try {
    const reply = await redis.findRedisKeys(id);
    return Promise.resolve(reply);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function findById(id: string): Promise<Resource> {
  try {
    const reply = await redis.getRedisDocument(id);
    return Promise.resolve({
      id,
      resource: reply
    });
  } catch (err) {
    return Promise.reject(err);
  }
}
