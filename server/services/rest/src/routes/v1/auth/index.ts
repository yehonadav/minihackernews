import { FastifyPluginAsync } from "fastify"
import {ensureConnection} from "@common/server";
import {loginWithUsernameSchemaValidation} from "../../../validations/loginWithUsernameSchema";

const users: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.post(
    '/login',
    {
      schema: {
        description: 'login',
        tags: ['auth'],
        summary: 'login',
        body: {
          description: 'user credentials',
          type: 'object',
          properties: {
            username: { type: 'string' },
            password: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'user details',
            type: 'object',
            properties: {
              id: {type: 'string'},
              username: {type: 'string'},
              jwtToken: {type: 'string'},
            },
          },
        },
      },
    },
    async function (request, reply) {
      const {username, password} = loginWithUsernameSchemaValidation(request.body);

      // instead of verifying if user exists
      if (username !== "yonadav")
        return reply.code(404).send("user not found");

      // instead of a crypting algo compared with a salted password
      if (password !== "123456")
        return reply.code(403).send("wrong username or password");

      const db = await ensureConnection();

      let user = await db.users.findOne({username});

      // instead of a sign up
      if (!user) {
        user = new db.users({
          username,
        });
        await user.save();
      }

      fastify.log.info(JSON.stringify({route: "/v1/auth/login", method: "POST", user}));

      return reply.send({
        id: user.id,
        username,
        jwtToken: JSON.stringify({userId: user.id}),
      });
    }
  );
}

export default users;
