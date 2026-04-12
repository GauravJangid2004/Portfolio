import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true, maxlength: 100 },
    email:   { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    read:    { type: Boolean, default: false },
    ip:      { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('Contact', contactSchema)
