import express from 'express'
import nodemailer from 'nodemailer'
import Contact from '../models/Contact.js'

const router = express.Router()

// POST /api/contact  — save message + optional email notification
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required.' })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email address.' })
    }

    // Save to MongoDB
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ip: req.ip,
    })

    // ── Optional: send email notification via Nodemailer ──────────────
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,   // Use Gmail App Password, NOT your real password
          },
        })

        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to:   process.env.NOTIFY_EMAIL || process.env.EMAIL_USER,
          subject: `[Portfolio] New message from ${name}: ${subject}`,
          html: `
            <div style="font-family:monospace;background:#050505;color:#00ff41;padding:24px;border-radius:8px;">
              <h2 style="color:#00ff41;">New Contact Form Submission</h2>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:6px 0;color:#aaa;width:80px;">Name</td><td style="color:#fff;">${name}</td></tr>
                <tr><td style="padding:6px 0;color:#aaa;">Email</td><td style="color:#fff;">${email}</td></tr>
                <tr><td style="padding:6px 0;color:#aaa;">Subject</td><td style="color:#fff;">${subject}</td></tr>
                <tr><td style="padding:6px 0;color:#aaa;vertical-align:top;">Message</td><td style="color:#fff;">${message.replace(/\n/g, '<br>')}</td></tr>
                <tr><td style="padding:6px 0;color:#aaa;">Received</td><td style="color:#fff;">${new Date().toLocaleString()}</td></tr>
              </table>
            </div>
          `,
        })
      } catch (mailErr) {
        // Email failed — log but don't fail the whole request
        console.error('Nodemailer error:', mailErr.message)
      }
    }

    res.status(201).json({
      success: true,
      message: 'Message received. I will get back to you soon!',
      id: contact._id,
    })
  } catch (err) {
    console.error('Contact POST error:', err)
    res.status(500).json({ success: false, error: 'Server error. Please try again.' })
  }
})

// GET /api/contact  — fetch all messages (admin only, simple auth)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }).limit(50)
    res.json({ success: true, count: messages.length, data: messages })
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error.' })
  }
})

export default router
