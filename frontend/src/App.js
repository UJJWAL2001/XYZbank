import Header from './components/Header'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import CreatAccount from './screens/CreatAccount'

const App = () => {
  return (
    <BrowserRouter basename='/'>
      <Header />
      <Container>
        <Route path='/' exact component={HomeScreen} />
        <Route path='/newCustomer' component={CreatAccount} />
      </Container>
    </BrowserRouter>
  )
}

export default App
