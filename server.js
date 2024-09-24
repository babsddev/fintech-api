import express, { urlencoded, json } from 'express'
import fileUpload from 'express-fileupload'
import morgan from 'morgan'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import connectDB from './database/db.js'
import authRoutes from './routes/authRoutes.js'
import transactionRoutes from './routes/transactions.js'

dotenv.config()
const app = express()

// Middleware
app.use(fileUpload())
app.use(cors())
app.use(morgan('combined'))
app.use(urlencoded({ extended: true, limit: '50mb' }))
app.use(json({ limit: '50mb' }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
})
app.use(limiter)

// Connect to the database
connectDB()

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/transactions', transactionRoutes)

// Root endpoint
app.get('/', (req, res) => {
  res.send({
    message: 'Hi, welcome to Fintect API service',
  })
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app
