import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  createAccountReducer,
  balanceAccountReducer,
} from './reducers/accountReducers'
import { amountDepositReducer } from './reducers/transcationReducers'

const reducer = combineReducers({
  createAccount: createAccountReducer,
  balanceAccount: balanceAccountReducer,
  amountDeposit: amountDepositReducer,
})

const middleware = [thunk]
const initialState = {}
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
