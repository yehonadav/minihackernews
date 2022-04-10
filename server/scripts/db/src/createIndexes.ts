import {ClientConnection} from "@common/server";

export const createIndexes = async (db:ClientConnection) => {
  for (const name of db.conn.modelNames()) {
    await db.conn.models[name].createIndexes();
  }
  console.log("createIndexes Script success");
};
