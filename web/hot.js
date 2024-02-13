/// <reference lib="dom" />

const host = window.location.host
const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'

const ws = new WebSocket(`${protocol}://${host}/hot`)

ws.addEventListener('open', () => {
  setInterval(() => {
    ws.send(JSON.stringify({ type: 'ping' }))
  }, 250)
})
ws.addEventListener('message', (event) => {
  const data = JSON.parse(event.data)
  if (data.type === 'reload') {
    console.log('[hot]', 'reloading...')
    window.location.reload()
  }

  if (data.type === 'log') {
    console.log('[hot]', data.message)
  }
})
