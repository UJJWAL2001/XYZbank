import mongoose from 'mongoose'
import generateUniqueKey from 'mongoose-generate-unique-key'
import bcrypt from 'bcrypt'

const accountSchema = mongoose.Schema({
  _id: {
    type: Number,
    max: 999999999,
  },
  accountType: {
    type: String,
    enum: ['saving', 'current'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
  },
  address: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
    min: 0,
  },
})

accountSchema.plugin(
  generateUniqueKey(() => String(Math.floor(Math.random() * 1000000000)))
)

accountSchema.methods.matchPin = async function (enteredPin) {
  return await bcrypt.compare(enteredPin, this.pin)
}

accountSchema.pre('save', async function (next) {
  if (!this.isModified('pin')) {
    next()
  } else {
    const salt = await bcrypt.genSalt(10)
    this.pin = await bcrypt.hash(this.pin, salt)
  }
})

const Account = mongoose.model('Account', accountSchema)

export default Account
