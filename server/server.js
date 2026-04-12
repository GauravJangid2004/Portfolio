import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import contactRoutes from './routes/contact.js'
import resumeRoutes  from './routes/resume.js'

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 5000
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:5173',
    'http://localhost:4173',  // Vite preview
  ],
  credentials: true,
}))
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

// ── Static files (resume PDFs) ──────────────────────────────────────────────
app.use('/public', express.static(path.join(__dirname, 'public')))

// ── API Routes ──────────────────────────────────────────────────────────────
app.use('/api/contact', contactRoutes)
app.use('/api/resume',  resumeRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Gaurav Portfolio API is live.',
    timestamp: new Date().toISOString(),
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

// ── MongoDB Connection ──────────────────────────────────────────────────────
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(`MongoDB connection failed: ${err.message}`)
    console.log('⚠  Running without database — contact form submissions will not be saved.')
  }
}

// ── Start Server ────────────────────────────────────────────────────────────
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(`   API endpoints:`)
    console.log(`   GET  /api/health`)
    console.log(`   POST /api/contact`)
    console.log(`   GET  /api/resume/pdf`)
    console.log(`   GET  /api/resume/docx`)
    console.log(`   GET  /api/resume/preview`)
  })
})
