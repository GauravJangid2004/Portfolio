import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const router = express.Router()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const RESUME_DIR = path.join(__dirname, '..', 'public', 'resume')

// GET /api/resume/pdf
router.get('/pdf', (req, res) => {
  const filePath = path.join(RESUME_DIR, 'Gaurav_Jangid_Resume.pdf')
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, error: 'PDF file not found. Please upload your resume to server/public/resume/' })
  }
  res.setHeader('Content-Disposition', 'attachment; filename="Gaurav_Jangid_Resume.pdf"')
  res.setHeader('Content-Type', 'application/pdf')
  res.sendFile(filePath)
})

// GET /api/resume/docx
router.get('/docx', (req, res) => {
  const filePath = path.join(RESUME_DIR, 'Gaurav_Jangid_Resume.docx')
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, error: 'DOCX file not found. Please upload your resume to server/public/resume/' })
  }
  res.setHeader('Content-Disposition', 'attachment; filename="Gaurav_Jangid_Resume.docx"')
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
  res.sendFile(filePath)
})

// GET /api/resume/preview  — inline view (no download prompt)
router.get('/preview', (req, res) => {
  const filePath = path.join(RESUME_DIR, 'Gaurav_Jangid_Resume.pdf')
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, error: 'PDF file not found.' })
  }
  res.setHeader('Content-Type', 'application/pdf')
  res.sendFile(filePath)
})

export default router
