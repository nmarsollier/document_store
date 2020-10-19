"use strict";

import * as redis from "../server/redis";
import { Resource } from "./schema";

interface FilesResult {
  files: string[];
  folders: string[];
  marker: string;
}

export async function findKeysById(id: string, singleLevel: boolean): Promise<FilesResult> {
  try {
    const reply = await redis.findRedisKeys(id, singleLevel);
    if (!singleLevel || reply.type == redis.ResultType.file) {
      return Promise.resolve({
        files: reply.data,
        folders: [],
        marker: ""
      });
    } else {
      return Promise.resolve({
        files: [],
        folders: reply.data,
        marker: ""
      });
    }
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
