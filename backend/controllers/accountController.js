import Account from '../models/accountModel.js'
import asyncHandler from 'express-async-handler'

//@desc     Creates Account
//@route    POST /api/accounts
const createAccount = asyncHandler(async (req, res) => {
  if (req.body.pin > 0 && req.body.pin <= 9999) {
    throw new Error('Pin must be a 4-digit number')
  }

  const account = new Account(req.body)

  const newAccount = await account.save()
  res.status(201).json(newAccount)
})

//@desc     get Balance
//@route    GET /api/accounts/:id
const getBalance = asyncHandler(async (req, res) => {
  const account = Account.findById(req.params.id)
  if (account) {
    res.status(200).json(account.balance)
  } else {
    res.status(404).json({ message: 'No account found' })
  }
})

export { createAccount, getBalance }
