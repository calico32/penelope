import { Subprocess } from 'bun'
import Elysia, { t } from 'elysia'
import { prisma } from '../env'
import { cleanOutput } from '../util'

async function runCommand(
  command: string,
  wait: boolean
): Promise<{ id: number } | { stdout: string; exitCode: number }> {
  let descriptor: { id: number }
  let out = ''
  let code = 0
  const promise = new Promise<void>((resolve, reject) => {
    Bun.spawn({
      cmd: ['docker', 'exec', '-t', 'template-attacker-1', 'bash', '-c', command],
      stdout: 'pipe',
      stderr: 'pipe',
      async onExit(subprocess: Subprocess<undefined, 'pipe', 'pipe'>, exitCode, signalCode, error) {
        const stdout = cleanOutput(await new Response(subprocess.stdout).text())
        const stderr = cleanOutput(await new Response(subprocess.stderr).text())
        if (descriptor) {
          await prisma.command.update({
            where: {
              id: descriptor.id,
            },
            data: {
              exitCode: exitCode,
              stdout,
              stderr,
              endedAt: new Date(),
            },
          })
        } else {
          out = stdout
          code = exitCode ?? 0
        }
      },
    })
  })

  if (!wait) {
    descriptor = await prisma.command.create({
      data: {
        command: command,
      },
    })

    return { id: descriptor.id }
  }

  await promise
  return {
    stdout: out,
    exitCode: code,
  }
}

const route_command_start = new Elysia()
route_command_start.post(
  '/command/start',
  async (ctx) => {
    return await runCommand(ctx.body.command, ctx.body.wait)
  },
  {
    body: t.Object({
      command: t.String(),
      wait: t.Boolean(),
    }),
    response: t.Union([
      t.Object({
        id: t.Integer(),
      }),
      t.Object({
        stdout: t.String(),
        exitCode: t.Integer(),
      }),
    ]),
    detail: {
      description:
        'Run a command on the attacker machine. If you expect the command to complete quickly, you can set `wait` to true to wait for the command to complete and return the output immediately. Otherwise, you can use /command/stdout to check the output later.',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['command'],
              properties: {
                command: {
                  type: 'string',
                  example: 'ls',
                },
                wait: {
                  type: 'boolean',
                  default: false,
                  example: true,
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
                oneOf: [
                  {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'integer',
                        example: 1,
                      },
                    },
                  },
                  {
                    type: 'object',
                    properties: {
                      stdout: {
                        type: 'string',
                        example: 'file1\nfile2\nfile3\n',
                      },
                      exitCode: {
                        type: 'integer',
                        example: 0,
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    },
  }
)

export default route_command_start
