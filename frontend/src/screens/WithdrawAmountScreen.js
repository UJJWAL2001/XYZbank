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
  TRANSFER_AMOUNT_RESET,
} from '../constants/transcationConstants'
import { withdrawAmount } from '../actions/transcationActions'

const WithdrawAmountScreen = () => {
  const [accountNo, setAccountNo] = useState('')
  const [pin, setPin] = useState('')
  const [amount, setAmount] = useState(0)

  const handleAccountNoChange = (e) => {
    if (
      e.target.value.match('^[0-9]*$') != null &&
      e.target.value.length <= 9
    ) {
      setAccountNo(e.target.value)
    }
  }

  const handlePinChange = (e) => {
    if (
      e.target.value.match('^[0-9]*$') != null &&
      e.target.value.length <= 4
    ) {
      setPin(e.target.value)
    }
  }

  const dispatch = useDispatch()
  const amountWithdraw = useSelector((state) => state.amountWithdraw)
  const { loading, error, withdrawInfo } = amountWithdraw

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(withdrawAmount(pin, accountNo, amount))
  }

  const today = new Date()

  useEffect(() => {
    dispatch({ type: ACCOUNT_CREATE_RESET })
    dispatch({ type: ACCOUNT_BALANCE_RESET })
    dispatch({ type: DEPOSIT_AMOUNT_RESET })
    dispatch({ type: TRANSFER_AMOUNT_RESET })

    if (!error && withdrawInfo) {
      setAccountNo('')
      setPin('')
      setAmount(0)
    }
  }, [withdrawInfo, error, dispatch])

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
        withdrawInfo && (
          <Row className='justify-content-center'>
            <Col xs={10} md={8}>
              <Message variant='info'>
                <Container>
                  <h5>Rs {withdrawInfo.message}</h5>
                </Container>
              </Message>
            </Col>
          </Row>
        )
      )}

      <Row className='justify-content-center'>
        <Col s={10} md={8}>
          <h3 className='mt-5'>Withdraw Money</h3>
          <Form className='mt-3' onSubmit={(e) => handleSubmit(e)}>
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
                  <Form.Text>Enter your 9-digit account number.</Form.Text>
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
                  <Form.Label>PIN</Form.Label>
                  <Form.Control
                    type='password'
                    required
                    value={pin}
                    onChange={(e) => handlePinChange(e)}
                  />
                  <Form.Text>Enter your 4-digit PIN.</Form.Text>
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

export default WithdrawAmountScreen
