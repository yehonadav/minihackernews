import {getMongooseClientAsync} from "@common/server";
import {createIndexes} from "./createIndexes";
import {createCollections} from "./createCollections";

export const createAll = async () => {
  const db = await getMongooseClientAsync();
  await createCollections(db);
  await createIndexes(db);
  console.log("createAll Script success");
};
