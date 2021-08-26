import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>XYZbank</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/newCustomer'>
              <Nav.Link>New Customer</Nav.Link>
            </LinkContainer>
            <NavDropdown
              id='nav-dropdown-dark-example'
              title='Services'
              menuvariant='dark'
            >
              <LinkContainer to='/deposit'>
                <NavDropdown.Item>Deposit</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/balance'>
                <NavDropdown.Item>Check Balance</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/withdraw'>
                <NavDropdown.Item>Withdraw</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/transfer'>
                <NavDropdown.Item>Transfer</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
