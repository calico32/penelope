import { html } from '@elysiajs/html'
import Elysia from 'elysia'
import HomePage from '.'
import ContactPage from './contact'
import css from './global.css'
import hot from './hot'
import LegalPage from './legal'
import tailwind from './tailwind'

const web = () => {
  const app = new Elysia({ name: 'web' })
    .use(html())
    // .use(compression())
    .use(
      tailwind({
        path: '/public/styles.css',
        source: css,
        config: './tailwind.config.ts',
      })
    )
    .use(hot())
    .get('/', () => <HomePage />)
    .get('/legal', () => <LegalPage />)
    .get('/contact', () => <ContactPage />)

  return app
}

export default web
