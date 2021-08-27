import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
import { ACCOUNT_CREATE_RESET } from '../constants/accountConstants'
import {
  TRANSFER_AMOUNT_RESET,
  WITHDRAW_AMOUNT_RESET,
  DEPOSIT_AMOUNT_RESET,
} from '../constants/transcationConstants'
import { accountBalance } from '../actions/accountActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const BalanceCheckScreen = () => {
  const [accountNo, setAccountNo] = useState('')

  const handleAccountNoChange = (e) => {
    if (
      e.target.value.match('^[0-9]*$') != null &&
      e.target.value.length <= 9
    ) {
      setAccountNo(e.target.value)
    }
  }

  const dispatch = useDispatch()
  const balanceAccount = useSelector((state) => state.balanceAccount)
  const { loading, error, balance } = balanceAccount

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(accountBalance(accountNo))
  }

  const today = new Date()

  useEffect(() => {
    dispatch({ type: ACCOUNT_CREATE_RESET })
    dispatch({ type: TRANSFER_AMOUNT_RESET })
    dispatch({ type: WITHDRAW_AMOUNT_RESET })
    dispatch({ type: DEPOSIT_AMOUNT_RESET })

    if (!error && balance) {
      setAccountNo('')
    }
  }, [balance, error])

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
        balance && (
          <Row className='justify-content-center'>
            <Col xs={10} md={8}>
              <Message variant='info'>
                <Container>
                  <h4>Account Balance : Rs {balance}</h4>
                </Container>
              </Message>
            </Col>
          </Row>
        )
      )}

      <Row className='justify-content-center'>
        <Col s={10} md={8}>
          <h3 className='mt-5'>Check Account Balance</h3>
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
                  <Form.Text>type your 9-digit account number.</Form.Text>
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

export default BalanceCheckScreen
