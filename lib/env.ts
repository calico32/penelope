import { PrismaClient } from '@prisma/client'

declare module 'bun' {
  interface Env {
    BASE_URL: string
    API_KEY: string
  }
}

export default function checkEnv() {
  if (!Bun.env.BASE_URL) {
    throw new Error('Missing BASE_URL in .env')
  }
  if (!Bun.env.API_KEY) {
    throw new Error('Missing API_KEY in .env')
  }
}

export const prisma = new PrismaClient()
