import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import analyseRouter from './routes/analyse.js'
import { testConnection } from './db.js'

dotenv.config()

const app = express()
const PORT = Number(process.env.SERVER_PORT || 4000)
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ['GET', 'POST', 'OPTIONS'],
  }),
)

app.use(express.json())

app.get('/api/health', async (_req, res) => {
  try {
    await testConnection()
    res.json({ status: 'ok' })
  } catch (error) {
    console.error('Healthcheck error:', error)
    res.status(500).json({ status: 'error', message: 'Database unreachable' })
  }
})

app.use('/api/analyse', analyseRouter)

app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' })
})

app.use((err, _req, res, _next) => {
  console.error('Unexpected error:', err)
  res.status(500).json({ error: 'Erreur interne du serveur' })
})

app.listen(PORT, async () => {
  try {
    await testConnection()
    console.log(`✅ Clarity backend en écoute sur http://localhost:${PORT}`)
  } catch (error) {
    console.error('❌ Échec de connexion à MySQL:', error.message)
  }
})


