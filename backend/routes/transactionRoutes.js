import express from 'express'
const router = express.Router()
import {
  depositAmount,
  transferAmount,
  withdrawAmount,
} from '../controllers/transcationControllers.js'

router.route('/deposit').post(depositAmount)
router.route('/withdraw').post(withdrawAmount)
router.route('/transfer').post(transferAmount)

export default router
