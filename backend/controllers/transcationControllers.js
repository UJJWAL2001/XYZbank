import Account from '../models/accountModel.js'
import Transaction from '../models/transcationModel.js'
import asyncHandler from 'express-async-handler'

//@desc     Deposits amount
//@route    POST /api/transactions/deposit
const depositAmount = asyncHandler(async (req, res) => {
  const { amount, accountNo, depositedBy } = req.body
  const account = await Account.findById(Number(accountNo))

  if (!account) {
    console.log('hell not found')
    res.status(404)
    throw new Error('Account not found')
  }

  const accountHolder = account.name

  if (amount > 0) {
    account.balance += amount
    const tran = new Transaction({
      accountNo,
      amount,
      accountHolder,
      depositedBy,
      tranType: 'deposit',
    })
    console.log(tran)
    await account.save()
    await tran.save()

    res.status(201).json({ TransactionID: tran._id })
  } else {
    res.status(400)
    throw new Error('Invalid Amount')
  }
})

//@desc     withdraw amount
//@route    POST /api/transactions/withdraw
const withdrawAmount = asyncHandler(async (req, res) => {
  const { accountNo, pin, amount } = req.body
  const account = await Account.findById(accountNo)

  if (account && (await account.matchPin(pin))) {
    if (amount > 0) {
      account.balance -= amount
      const accountHolder = account.name
      const tran = new Transaction({
        accountHolder,
        accountNo,
        amount,
        tranType: 'withdraw',
      })

      await account.save()
      await tran.save()

      res.status(200).json({ message: `${amount} is withdrawn` })
    } else {
      res.status(400)
      throw new Error('Invalid Amount')
    }
  } else {
    res.status(400)
    throw new Error('Account number or PIN is incorrect')
  }
})

//@desc     transfer the amount
//@route    POST /api/transactions/transfer
const transferAmount = asyncHandler(async (req, res) => {
  const { toAccountNo, fromAccountNo, amount, toName } = req.body
  const toAccount = await Account.findById(toAccountNo)
  const fromAccount = await Account.findById(fromAccountNo)

  if (!fromAccount) {
    res.status(404)
    throw new Error('Account Not found')
  }

  if (!(toAccount && toAccount.name === toName)) {
    res.status(404)
    throw new Error('No beneficiary account found')
  }

  if (amount > 0 && amount <= fromAccount.balance) {
    fromAccount.balance -= amount
    toAccount.balance += amount
    const tran = new Transaction({
      accountHolder: toName,
      accountNo: toAccountNo,
      amount,
      tranType: 'transfer',
      transferInfo: { fromAccountNo },
    })

    await toAccount.save()
    await fromAccount.save()
    await tran.save()

    res.status(200).json(tran)
  } else {
    res.status(400)
    throw new Error('Invalid Amount')
  }
})

export { depositAmount, withdrawAmount, transferAmount }
