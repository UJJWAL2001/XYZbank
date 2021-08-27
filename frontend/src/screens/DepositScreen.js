import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
import { depositAmount } from '../actions/transcationActions'
import {
  ACCOUNT_BALANCE_RESET,
  ACCOUNT_CREATE_RESET,
} from '../constants/accountConstants'
import {
  TRANSFER_AMOUNT_RESET,
  WITHDRAW_AMOUNT_RESET,
} from '../constants/transcationConstants'
import Loader from '../components/Loader'
import Message from '../components/Message'

const DepositScreen = () => {
  const [depositedBy, setDepositedBy] = useState('')
  const [accountNo, setAccountNo] = useState('')
  const [amount, setAmount] = useState(0)

  const handleAccountNoChange = (e) => {
    if (
      e.target.value.match('^[0-9]*$') != null &&
      e.target.value.length <= 9
    ) {
      setAccountNo(e.target.value)
    }
  }

  const reset = () => {
    setDepositedBy('')
    setAccountNo('')
    setAmount(0)
  }

  const dispatch = useDispatch()
  const amountDeposit = useSelector((state) => state.amountDeposit)
  const { loading, error, depositInfo } = amountDeposit

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(depositAmount(depositedBy, accountNo, amount))
  }

  const today = new Date()

  useEffect(() => {
    dispatch({ type: ACCOUNT_CREATE_RESET })
    dispatch({ type: ACCOUNT_BALANCE_RESET })
    dispatch({ type: TRANSFER_AMOUNT_RESET })
    dispatch({ type: WITHDRAW_AMOUNT_RESET })

    if (!error && depositInfo) {
      reset()
    }
  }, [depositInfo, error, dispatch])

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
        depositInfo && (
          <Row className='justify-content-center'>
            <Col xs={10} md={8}>
              <Message variant='success'>
                <Container>
                  <h4>Money is deposited Successfully</h4>
                  <p>
                    <strong>
                      Transcation ID : {depositInfo.TransactionID}
                    </strong>
                  </p>
                </Container>
              </Message>
            </Col>
          </Row>
        )
      )}

      <Row className='justify-content-center'>
        <Col s={10} md={8}>
          <h3 className='mt-5'>Deposit Amount</h3>
          <Form className='mt-3' onSubmit={(e) => handleSubmit(e)}>
            <Row className='mb-2'>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Depositer Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Type your name here..'
                    required
                    value={depositedBy}
                    onChange={(e) => setDepositedBy(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={{ span: 3, offset: 1 }}>
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
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control
                    type='text'
                    required
                    value={accountNo}
                    onChange={(e) => handleAccountNoChange(e)}
                  />
                  <Form.Text>type your 9-digit account number.</Form.Text>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type='number'
                    required
                    mim={0}
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

export default DepositScreen
