import mongoose from 'mongoose'

const TranscationSchema = mongoose.Schema({
  tranType: {
    type: String,
    enum: ['deposit', 'withdraw', 'transfer'],
    required: true,
  },
  accountNo: {
    type: Number,
    required: true,
    min: 0,
    max: 999999999,
  },
  accountHolder: {
    type: String,
    required: true,
  },
  tranDate: {
    type: Date,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  depositedBy: {
    type: String,
    default: 'n/a',
  },
  transferInfo: {
    fromAccountNo: {
      type: Number,
      min: 0,
      max: 999999999,
      default: 0,
    },
  },
})

TranscationSchema.pre('save', function () {
  this.tranDate = new Date()
})

const Transaction = mongoose.model('Transcation', TranscationSchema)

export default Transaction
