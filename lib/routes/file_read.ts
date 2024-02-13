import { Subprocess } from 'bun'
import Elysia, { t } from 'elysia'

import path from 'path'

const route_file_read = new Elysia()
route_file_read.post(
  '/file/read',
  async (ctx) => {
    const absolutePath = path.resolve('/home/attacker', ctx.body.path)

    await new Promise<void>((resolve, reject) => {
      Bun.spawn({
        cmd: ['docker', 'cp', 'template-attacker-1:' + absolutePath, '/tmp/penelope-file-read'],
        stdout: 'pipe',
        stderr: 'pipe',
        async onExit(
          subprocess: Subprocess<undefined, 'pipe', 'pipe'>,
          exitCode,
          signalCode,
          error
        ) {
          if (exitCode !== 0) {
            reject(await new Response(subprocess.stderr).text())
          } else {
            resolve()
          }
        },
      })
    })

    return new Response(Bun.file('/tmp/penelope-file-read')).text()
  },
  {
    body: t.Object({
      path: t.String(),
    }),
    detail: {
      description: 'Read a file from the attacker machine, returning the file contents.',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                path: {
                  type: 'string',
                  example: '/etc/passwd',
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
                description: 'The file contents',
              },
            },
          },
        },
      },
    },
  }
)

export default route_file_read
