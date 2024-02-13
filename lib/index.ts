import cors from '@elysiajs/cors'
import swagger from '@elysiajs/swagger'
import Elysia from 'elysia'
import webPlugin from '../web/router'
import checkEnv from './env'
import plugin from './plugin'
import route_command_get from './routes/command_get'
import route_command_start from './routes/command_start'
import route_command_stdout from './routes/command_stdout'
import route_file_read from './routes/file_read'
import route_version from './routes/version'

const routes = [
  route_version,
  route_command_start,
  route_command_get,
  route_command_stdout,
  route_file_read,
]

checkEnv()

const web = webPlugin()

let app = new Elysia()
  .use(cors({ origin: ['chat.openai.com', 'localhost:8000', 'localhost'] }))
  .use(web)
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Penelope',
          version: '1.0.0',
        },
        servers: [
          {
            url: Bun.env.BASE_URL,
            description: 'Development server',
          },
        ],
      },
      path: '/swagger',
      exclude: [
        '/.well-known/ai-plugin.json',
        '/openapi.yaml',
        ...web.routes.map((route) => route.path),
      ],
    })
  )

app.group('', (app) => {
  app.onBeforeHandle((ctx) => {
    const apiKey = ctx.request.headers.get('Authorization')
    if (apiKey !== `Bearer ${Bun.env.API_KEY}`) {
      ctx.set.status = 401
      return 'Unauthorized'
    }
  })
  for (const route of routes) {
    app.use(route)
  }
  return app
})

app.get('/.well-known/ai-plugin.json', (ctx) => plugin)

app.listen(8000)

console.log('Listening on http://localhost:8000')
