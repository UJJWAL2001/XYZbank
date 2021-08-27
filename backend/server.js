import express from 'express'
import dotenv from 'dotenv'

import connectDB from './config/db.js'
import { errorhandler } from './middlewares/errorhandler.js'
import accountRoutes from './routes/accountRoutes.js'
import transcationRoutes from './routes/transactionRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello')
})

app.use('/api/accounts', accountRoutes)
app.use('/api/transcations', transcationRoutes)

app.use(errorhandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server runnning in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
