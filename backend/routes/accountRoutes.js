import express from 'express'
const router = express.Router()
import { createAccount, getBalance } from '../controllers/accountController.js'

router.route('/').post(createAccount)
router.route('/:id').get(getBalance)

export default router
