import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  ACCOUNT_BALANCE_RESET,
  ACCOUNT_CREATE_RESET,
} from '../constants/accountConstants'
import {
  DEPOSIT_AMOUNT_RESET,
  WITHDRAW_AMOUNT_RESET,
} from '../constants/transcationConstants'
import { transferAmount } from '../actions/transcationActions'

const TransferAmountScreen = () => {
  const [toAccountNo, setToAccountNo] = useState('')
  const [fromAccountNo, setFromAccountNo] = useState('')
  const [toName, setToName] = useState('')
  const [amount, setAmount] = useState(0)

  const handleAccountNoChange = (e, fun) => {
    if (
      e.target.value.match('^[0-9]*$') != null &&
      e.target.value.length <= 9
    ) {
      fun(e.target.value)
    }
  }

  const dispatch = useDispatch()
  const amountTransfer = useSelector((state) => state.amountTransfer)
  const { loading, error, transferInfo } = amountTransfer

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(transferAmount(toAccountNo, fromAccountNo, amount, toName))
  }

  const today = new Date()

  useEffect(() => {
    dispatch({ type: ACCOUNT_CREATE_RESET })
    dispatch({ type: ACCOUNT_BALANCE_RESET })
    dispatch({ type: DEPOSIT_AMOUNT_RESET })
    dispatch({ type: WITHDRAW_AMOUNT_RESET })

    if (!error && transferInfo) {
      setToAccountNo('')
      setFromAccountNo('')
      setAmount(0)
      setToName('')
    }
  }, [transferInfo, error, dispatch])

  return (
    <>
      {loading && <Loader />}
      {error ? (
        <Row className='justify-content-center'>
          <Col xs={10} md={8}>
            <Message>{error}</Message>
          </Col>
        </Row>
      ) : (
        transferInfo && (
          <Row className='justify-content-center'>
            <Col xs={10} md={8}>
              <Message variant='info'>
                <Container>
                  <h5>Amount Transfered Receipt : XYZBank</h5>
                  <p>
                    <strong>Transcation ID : {transferInfo._id}</strong>
                  </p>
                  <p>Account No. : {transferInfo.transferInfo.fromAccountNo}</p>
                  <p>Beneficiary Account No. : {transferInfo.accountNo}</p>
                  <p>Beneficiary Name : {transferInfo.accountHolder}</p>
                  <p>Amount Transfered : Rs {transferInfo.amount}</p>
                </Container>
              </Message>
            </Col>
          </Row>
        )
      )}

      <Row className='justify-content-center'>
        <Col s={10} md={8}>
          <h3 className='mt-5'>Transfer from Account</h3>
          <Form className='mt-3' onSubmit={(e) => handleSubmit(e)}>
            <Row className='mb-2'>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Account No.</Form.Label>
                  <Form.Control
                    type='text'
                    required
                    value={fromAccountNo}
                    onChange={(e) => handleAccountNoChange(e, setFromAccountNo)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Beneficiary Account No.</Form.Label>
                  <Form.Control
                    type='text'
                    required
                    value={toAccountNo}
                    onChange={(e) => handleAccountNoChange(e, setToAccountNo)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <label className='form-label'>Date</label>
                  <input
                    type='text'
                    className='form-control'
                    value={today}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-2'>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Beneficiary Name</Form.Label>
                  <Form.Control
                    type='text'
                    required
                    value={toName}
                    onChange={(e) => setToName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={{ span: 3, offset: 1 }}>
                <Form.Group>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type='number'
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className='mt-4'>
                <Button size='lg' type='submit'>
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default TransferAmountScreen
