import mongoose, {ConnectOptions, Model} from 'mongoose';
import {getEnvironmentVariables} from "application-common-components";
import {hour} from "@yehonadav/timeunit";
import {PostsDocument, postsSchema} from "../models/posts";
import {VotesDocument, votesSchema} from "../models/votes";
import {UsersDocument, usersSchema} from "../models/users";

export class ClientConnection {
  public conn: mongoose.Connection;
  public posts: Model<PostsDocument>;
  public votes: Model<VotesDocument>;
  public users: Model<UsersDocument>;

  constructor(uri:string, options:ConnectOptions) {
    this.conn = mongoose.createConnection(uri, options);
    this.users = this.createModel<UsersDocument>('users', usersSchema);
    this.posts = this.createModel<PostsDocument>('posts', postsSchema);
    this.votes = this.createModel<VotesDocument>('votes', votesSchema);
  }

  createModel = <T>(name: string, schema: mongoose.Schema<T>):Model<T> =>
    this.conn.models[name] || this.conn.model<T>(name, schema);
}

export const getMongooseClientAsync = async ():Promise<ClientConnection> => {
  console.log({section:"getMongooseClientAsync", message:"start"});
  const [
    DB_PROTOCOL,
    DB_USER,
    DB_PASS,
    DB_URL,
    DB_NAME,
    DB_PARAMS,
  ] = getEnvironmentVariables(
    'DB_PROTOCOL',
    'DB_USER',
    'DB_PASS',
    'DB_URL',
    'DB_NAME',
    'DB_PARAMS'
  );

  const DB_URI = `${DB_PROTOCOL}://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASS)}@${DB_URL}/${DB_NAME}${DB_PARAMS}`;

  const databaseConnectOptions:ConnectOptions = {
    dbName: DB_NAME,

    autoIndex: false,
    autoCreate: false,

    // we'll see when we need this
    // socketTimeoutMS: 10000,
    // connectTimeoutMS: 10000,
    maxIdleTimeMS: hour,
    readPreference: "nearest",
  }

  const client = new ClientConnection(DB_URI, databaseConnectOptions);
  await client.conn;
  console.log({section:"getMongooseClientAsync", message:"connection success"});
  return client
}

let client:Promise<ClientConnection>;

const getClient = () => {
  if (!client)
    client = getMongooseClientAsync();
  return client;
}

const retry = () => {
  client = getMongooseClientAsync();
  return client;
}

export const ensureConnection = () => getClient().catch(retry);