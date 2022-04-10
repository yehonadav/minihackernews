import fp from 'fastify-plugin'
import cors, { FastifyCorsOptions } from 'fastify-cors'

/**
 * This plugin adds CORS to handle http origins
 *
 * @see https://github.com/fastify/fastify-cors
 */

const corsOptions:FastifyCorsOptions = {
  origin: ['*', 'http://localhost:3000', 'https://localhost:3000', 'http://127.0.0.1:3000', 'https://127.0.0.1:3000']
}

export default fp<FastifyCorsOptions>(async (fastify, _opts) => {
  fastify.register(cors, corsOptions)
})
