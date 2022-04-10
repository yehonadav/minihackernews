import fp from 'fastify-plugin'
import swagger, { SwaggerOptions } from 'fastify-swagger'

const swaggerOptions:SwaggerOptions = {
  routePrefix: '/v1/docs',
  swagger: {
    info: {
      title: 'Test swagger',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'example', description: 'example apis' },
    ],
    definitions: {
      User: {
        type: 'object',
        required: ['id', 'email'],
        properties: {
          id: { type: 'string', format: 'uuid' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: {type: 'string', format: 'email' }
        }
      }
    },
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header'
      }
    }
  },
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (_request, _reply, next) { next() },
    preHandler: function (_request, _reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  exposeRoute: true
}

/**
 * This plugins adds some docs for http requests
 *
 * @see https://github.com/fastify/fastify-plugin
 */
export default fp<SwaggerOptions>(async (fastify, _opts) => {
  fastify.register(swagger, swaggerOptions);
  fastify.ready(err => {
    if (err) throw err
    fastify.swagger()
  })
})
