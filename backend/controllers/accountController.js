import Account from '../models/accountModel.js'
import asyncHandler from 'express-async-handler'

//@desc     Creates Account
//@route    POST /api/accounts
const createAccount = asyncHandler(async (req, res) => {
  if (req.body.pin < 0 && req.body.pin >= 9999) {
    res.status(400)
    throw new Error('Pin must be a 4-digit number')
  }

  const currentDate = new Date()
  const age =
    Number(currentDate.getFullYear()) - Number(req.body.dob.slice(0, 4))

  if (age < 18) {
    res.status(400)
    throw new Error('You should at least be 18 years old')
  }

  const account = new Account({ ...req.body, age: Number(age) })

  const newAccount = await account.save()
  res.status(201).json({
    accountNo: newAccount._id,
    name: newAccount.name,
    dob: newAccount.dob,
    age,
    address: newAccount.address,
    accountType: newAccount.accountType,
  })
})

//@desc     get Balance
//@route    GET /api/accounts/:id
const getBalance = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id)
  if (account) {
    res.status(200).json(account.balance)
  } else {
    res.status(404).json({ message: 'No account found' })
  }
})

export { createAccount, getBalance }
