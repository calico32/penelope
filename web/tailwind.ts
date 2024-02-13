import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import Elysia from 'elysia'
import postcss from 'postcss'
import tw, { Config } from 'tailwindcss'

type Options = {
  minify?: boolean
  map?: boolean
  autoprefixer?: boolean
}

const tailwind = (settings: {
  path: string
  source: string
  config: Config | string
  options?: Options
}) => {
  const {
    path,
    source,
    config,
    options: {
      minify: enableMinifier = Bun.env.NODE_ENV === 'production',
      map = Bun.env.NODE_ENV !== 'production',
      autoprefixer: enableAutoprefixer = true,
    } = {},
  } = settings

  async function process(sourceText: string) {
    const plugins = [tw(config)]

    if (enableAutoprefixer) {
      plugins.push(autoprefixer() as any) // TS gets confused here
    }

    if (enableMinifier) {
      plugins.push(cssnano())
    }

    const result = await postcss(...plugins).process(sourceText, {
      from: source,
      map,
    })

    return result.css
  }

  const result = Bun.file(source).text().then(process)

  return new Elysia({ name: 'tailwind', seed: settings }).get(path, async ({ set }) => {
    set.headers['content-type'] = 'text/css'
    return result
  })
}

export default tailwind
