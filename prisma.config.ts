import { config } from 'dotenv'
import path from 'node:path'
import type { PrismaConfig } from 'prisma'

// Charger les variables d'environnement depuis .env
config({ path: path.resolve(__dirname, '.env') })


export default {
  earlyAccess: true,
  schema: path.join('prisma'),
} satisfies PrismaConfig