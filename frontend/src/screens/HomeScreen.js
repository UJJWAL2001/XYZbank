import React, { useEffect } from 'react'
import { resetState } from '../actions/reset'
import { useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap'

const HomeScreen = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetState())
  }, [dispatch])
  return (
    <Container>
      <div className='text-center mt-5'>
        <h2>Welcome to</h2>
        <h1>XYZbank</h1>
      </div>
    </Container>
  )
}

export default HomeScreen
