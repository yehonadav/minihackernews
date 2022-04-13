import { FastifyPluginAsync } from "fastify"
import {ensureConnection} from "@common/server";
import {createVoteSchemaValidation} from "../../../validations/createVoteSchemaValidation";
import {objectId} from "backend-common-components";

const votes: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.post(
    '/',
    {
      schema: {
        description: 'create a vote',
        tags: ['votes'],
        summary: 'create vote',
        body: {
          description: 'vote data',
          type: 'object',
          properties: {
            postId: { type: 'string'},
          },
        },
        headers: {
          'Authorization': {
            description: 'bearer {jwtToken}',
            type: 'string'
          },
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'string',
          },
        },
        security: [
          {
            "apiKey": []
          }
        ]
      }
    },
    async function (request, reply) {
      // instead of jwt https://www.npmjs.com/package/jsonwebtoken
      // verify a token symmetric - synchronous
      // const ownerUserId = jwt.verify(token, 'shhhhh').userId;
      const userId = JSON.parse((request.headers["authorization"] as string).split("bearer ")[1] || "{\"userId\":\"\"}")["userId"];

      const {postId} = createVoteSchemaValidation(request.body);

      const db = await ensureConnection();

      // when dealing in high load it would
      // make more sense to queue this transaction
      await db.conn.transaction(async (session) => {
        // votes are indexed to be unique by userId & postId
        // so that ensures vote does not exist (exception is thrown otherwise)
        // TODO: handle already exist exception
        await db.votes.create({userId: objectId(userId), postId: objectId(postId)}, { session });

        // we need a way to ensure this happens if a vote is created,
        // a transaction might be a good way to go about this
        await db.posts.findOneAndUpdate({_id: objectId(postId)}, {$inc: {votes:1}}, { session });
      });

      reply.send('');
    }
  );
}

export default votes;
