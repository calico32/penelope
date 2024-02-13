import Elysia, { t } from 'elysia'
import { prisma } from '../env'

const route_command_get = new Elysia()
route_command_get.post(
  '/command/get',
  async (ctx) => {
    if (Number.isNaN(ctx.body.id)) {
      throw new Error('Invalid ID')
    }
    const command = await prisma.command.findUnique({ where: { id: ctx.body.id } })
    if (!command) {
      throw new Error('Command not found')
    }
    return command
  },
  {
    body: t.Object({
      id: t.Integer(),
    }),
    detail: {
      description: 'Retrieve a command by ID, returning its status and output',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  example: 1,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    example: 1,
                  },
                },
              },
            },
          },
        },
      },
    },
  }
)

export default route_command_get
