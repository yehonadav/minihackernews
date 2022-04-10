import {ClientConnection} from "@common/server";

export const createCollections = async (db:ClientConnection) => {
  for (const name of db.conn.modelNames()) {
    await db.conn.models[name].createCollection();
  }
  console.log("createCollections Script success");
};
