import Elysia, { t } from 'elysia'
import { prisma } from '../env'

const route_command_stdout = new Elysia()
route_command_stdout.post(
  '/command/stdout',
  async (ctx) => {
    if (Number.isNaN(ctx.body.id)) {
      throw new Error('Invalid ID')
    }
    const command = await prisma.command.findUnique({ where: { id: ctx.body.id } })
    if (!command) {
      throw new Error('Command not found')
    }
    return command.stdout
  },
  {
    body: t.Object({
      id: t.Integer(),
    }),
    detail: {
      description: 'Get the stdout of a command',
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
            'text/plain': {
              schema: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  }
)

export default route_command_stdout
