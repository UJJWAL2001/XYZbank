import Header from './components/Header'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import CreateAccount from './screens/CreateAccount'
import DepositScreen from './screens/DepositScreen'
import BalanceCheckScreen from './screens/BalanceCheckScreen'
import WithdrawAmountScreen from './screens/WithdrawAmountScreen'
import TransferAmountScreen from './screens/TransferAmountScreen'

const App = () => {
  return (
    <BrowserRouter basename='/'>
      <Header />
      <Container>
        <Route path='/' exact component={HomeScreen} />
        <Route path='/newCustomer' component={CreateAccount} />
        <Route path='/deposit' component={DepositScreen} />
        <Route path='/balance' component={BalanceCheckScreen} />
        <Route path='/withdraw' component={WithdrawAmountScreen} />
        <Route path='/transfer' component={TransferAmountScreen} />
      </Container>
    </BrowserRouter>
  )
}

export default App
