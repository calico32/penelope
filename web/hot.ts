import { ServerWebSocket } from 'bun'
import Elysia from 'elysia'

declare global {
  module globalThis {
    var hot: number
  }
}

if (Bun.env.NODE_ENV === 'development') {
  globalThis.hot ??= 0
  globalThis.hot++

  if (globalThis.hot > 1) {
    console.log('[hot] reloaded')
  }
}

const hot = () => {
  if (Bun.env.NODE_ENV !== 'development') {
    // no-op
    return new Elysia({ name: 'hot' })
  }

  const sockets = new WeakMap<ServerWebSocket<any>, number>()
  const app = new Elysia({ name: 'hot' })

  app.get('/hot.js', () => Bun.file(import.meta.dir + '/hot.js'))
  app.ws('/hot', {
    open(ws) {
      sockets.set(ws.raw, globalThis.hot)
      ws.send({
        type: 'log',
        message: 'hot reload enabled',
      })
    },
    message(ws, data: any) {
      if (data.type === 'ping') {
        if (sockets.get(ws.raw) !== globalThis.hot) {
          ws.send({ type: 'reload' })
          sockets.delete(ws.raw)
        }
      }
    },
    close(ws, code, message) {
      sockets.delete(ws.raw)
    },
  })

  return app
}

export default hot
