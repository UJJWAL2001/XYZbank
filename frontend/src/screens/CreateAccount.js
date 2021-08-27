import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
import { ACCOUNT_BALANCE_RESET } from '../constants/accountConstants'
import {
  TRANSFER_AMOUNT_RESET,
  WITHDRAW_AMOUNT_RESET,
  DEPOSIT_AMOUNT_RESET,
} from '../constants/transcationConstants'
import { createNewAccount } from '../actions/accountActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const CreateAccount = () => {
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [pin, setPin] = useState('')
  const [accountType, setAccountType] = useState('')
  const [address, setAddress] = useState('')

  const handlePinChange = (e) => {
    if (
      e.target.value.match('^[0-9]*$') != null &&
      e.target.value.length <= 4
    ) {
      setPin(e.target.value)
    }
  }

  const reset = () => {
    setName('')
    setDob('')
    setPin('')
    setAccountType('')
    setAddress('')
  }

  const dispatch = useDispatch()

  const createAccount = useSelector((state) => state.createAccount)
  const { loading, error, accountInfo } = createAccount

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createNewAccount(name, dob, pin, accountType, address))
  }

  useEffect(() => {
    dispatch({ type: ACCOUNT_BALANCE_RESET })
    dispatch({ type: TRANSFER_AMOUNT_RESET })
    dispatch({ type: WITHDRAW_AMOUNT_RESET })
    dispatch({ type: DEPOSIT_AMOUNT_RESET })

    if (!error && accountInfo) {
      reset()
    }
  }, [accountInfo, error])

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
        accountInfo && (
          <Row className='justify-content-center'>
            <Col xs={10} md={8}>
              <Message variant='success'>
                <Container>
                  <h4 className='ps-5'>Account Created Successfully</h4>
                  <Row>
                    <Col xs={6} md={3} className='text-end'>
                      <strong>Account Number : </strong>
                    </Col>
                    <Col xs={6} md={3}>
                      <strong>
                        {accountInfo.accountNo} - {accountInfo.accountType}
                      </strong>
                    </Col>
                    <Col xs={6} md={2} className='text-end'>
                      Name :{' '}
                    </Col>
                    <Col xs={6} md={3}>
                      {accountInfo.name}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6} md={3} className='text-end'>
                      Age :{' '}
                    </Col>
                    <Col xs={6} md={3}>
                      {accountInfo.age} years
                    </Col>
                    <Col xs={6} md={2} className='text-end'>
                      DOB :{' '}
                    </Col>
                    <Col xs={6} md={3}>
                      {accountInfo.dob.slice(0, 10)}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6} md={3} className='text-end'>
                      Address :{' '}
                    </Col>
                    <Col xs={6} md={3}>
                      {accountInfo.address}
                    </Col>
                  </Row>
                </Container>
              </Message>
            </Col>
          </Row>
        )
      )}
      <Row className='justify-content-center'>
        <Col s={10} md={8}>
          <h3 className='mt-5'>New Account Form</h3>
          <Form className='mt-3' onSubmit={(e) => handleSubmit(e)}>
            <Row className='mb-2'>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Type your name here..'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={{ span: 3, offset: 1 }}>
                <Form.Group>
                  <label className='form-label'>DOB</label>
                  <input
                    type='date'
                    className='form-control'
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-2'>
              <Col>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as='textarea'
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                  <Form.Text>Set your 4-digit pin.</Form.Text>
                </Form.Group>
              </Col>
              <Col md={{ span: 3, offset: 1 }}>
                <Form.Group>
                  <Form.Label>Account Type</Form.Label>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                    onChange={(e) => setAccountType(e.target.value)}
                    value={accountType}
                  >
                    <option defaultValue></option>
                    <option value='saving'>Saving</option>
                    <option value='current'>Current</option>
                  </select>
                  <Form.Text>Select your Account Type</Form.Text>
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

export default CreateAccount
