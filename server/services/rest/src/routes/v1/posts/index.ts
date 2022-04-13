import { FastifyPluginAsync } from "fastify"
import {ensureConnection, PostsDocument} from "@common/server";
import {Cacher} from "@yehonadav/cacher"
import {createPostSchemaValidation} from "../../../validations/createPostSchemaValidation";
import {objectId} from "backend-common-components";

const cache = new Cacher();
const pageSize = 30;

const posts: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get(
    '/',
    {
      schema: {
        description: 'get posts',
        tags: ['posts'],
        summary: 'get posts',
        querystring: {
          p: { type: 'number', description: 'page number'}
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {type: 'string'},
                title: {type: 'string'},
                text: {type: 'string'},
                votes: {type: 'number'},
                created: {type: 'string'},
                ownerUserId: {type: 'string'},
              },
            },
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
      const skip = (((request.query as any).p || 1) -1) * pageSize;

      const db = await ensureConnection();

      const posts = await cache.get<PostsDocument[]>(
        {path:"/v1/posts", method:"GET", skip},
        async () => await db.posts.find().sort({"votes": -1, "created": -1}).skip(skip).limit(pageSize)
      );

      reply.send(posts.map(i=>({
        title:i.title,
        text:i.text||"",
        ownerUserId:i.ownerUserId.toHexString(),
        votes: i.votes,
        created: i.created,
        id: i.id
      })));
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        description: 'create a post',
        tags: ['posts'],
        summary: 'create post',
        body: {
          description: 'post data',
          type: 'object',
          properties: {
            title: { type: 'string'},
            text: { type: 'string'},
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
            type: 'object',
            properties: {
              id: {type: 'string'},
              title: {type: 'string'},
              text: {type: 'string'},
              votes: {type: 'number'},
              created: {type: 'string'},
              ownerUserId: {type: 'string'},
            },
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
      const ownerUserId = JSON.parse((request.headers["authorization"] as string).split("bearer ")[1] || "{\"userId\":\"\"}")["userId"];

      const {title, text} = createPostSchemaValidation(request.body);

      const db = await ensureConnection();

      const post = await db.posts.create({title, text, ownerUserId: objectId(ownerUserId)});

      reply.send(post);
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        description: 'edit a post',
        tags: ['posts'],
        summary: 'edit post',
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'example id'
            }
          }
        },
        body: {
          description: 'post data',
          type: 'object',
          properties: {
            title: { type: 'string'},
            text: { type: 'string'},
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
            type: 'object',
            properties: {
              id: {type: 'string'},
              title: {type: 'string'},
              text: {type: 'string'},
              votes: {type: 'number'},
              created: {type: 'string'},
              ownerUserId: {type: 'string'},
            },
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
      const ownerUserId = JSON.parse((request.headers["authorization"] as string).split("bearer ")[1] || "{\"userId\":\"\"}")["userId"];
      const postId:string = (request.params as any).id;

      const update = createPostSchemaValidation(request.body);

      const db = await ensureConnection();

      const post = await db.posts.findOneAndUpdate({_id: objectId(postId), ownerUserId: objectId(ownerUserId)}, {$set: update}, {new: true});

      reply.send(post);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        description: 'delete a post',
        tags: ['posts'],
        summary: 'delete post',
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'example id'
            }
          }
        },
        headers: {
          'Authorization': {
            description: 'bearer {jwtToken}',
            type: 'string'
          },
        },
        response: {
          204: {
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
      const ownerUserId = JSON.parse((request.headers["authorization"] as string).split("bearer ")[1] || "{\"userId\":\"\"}")["userId"];
      const postId = (request.params as any).id;

      const db = await ensureConnection();

      await db.posts.deleteOne({_id: objectId(postId), ownerUserId: objectId(ownerUserId)});

      reply.code(204).send("");
    }
  );
}

export default posts;
