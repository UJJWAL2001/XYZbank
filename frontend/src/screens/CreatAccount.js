import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

const CreatAccount = () => {
  return (
    <>
      <Row className='justify-content-center'>
        <Col s={10} md={8}>
          <h3 className='mt-5'>New Account Form</h3>
          <Form className='mt-3'>
            <Row className='mb-2'>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Type your name here..'
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={{ span: 3, offset: 1 }}>
                <Form.Group>
                  <label className='form-label'>DOB</label>
                  <input type='date' className='form-control' required />
                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-2'>
              <Col>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control as='textarea' required />
                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-2'>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>PIN</Form.Label>
                  <Form.Control type='password' required />
                  <Form.Text>Set your 4-digit pin.</Form.Text>
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

export default CreatAccount
