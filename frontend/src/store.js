import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  createAccountReducer,
  balanceAccountReducer,
} from './reducers/accountReducers'
import {
  amountDepositReducer,
  amountWithdrawReducer,
  amountTransferReducer,
} from './reducers/transcationReducers'

const reducer = combineReducers({
  createAccount: createAccountReducer,
  balanceAccount: balanceAccountReducer,
  amountDeposit: amountDepositReducer,
  amountWithdraw: amountWithdrawReducer,
  amountTransfer: amountTransferReducer,
})

const middleware = [thunk]
const initialState = {}
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
