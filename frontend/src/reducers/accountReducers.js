import {
  ACCOUNT_BALANCE_FAIL,
  ACCOUNT_BALANCE_REQUEST,
  ACCOUNT_BALANCE_RESET,
  ACCOUNT_BALANCE_SUCCESS,
  ACCOUNT_CREATE_FAIL,
  ACCOUNT_CREATE_REQUEST,
  ACCOUNT_CREATE_RESET,
  ACCOUNT_CREATE_SUCCESS,
} from '../constants/accountConstants'

export const createAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNT_CREATE_REQUEST:
      return { loading: true }
    case ACCOUNT_CREATE_SUCCESS:
      return { loading: false, accountInfo: action.payload }
    case ACCOUNT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case ACCOUNT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const balanceAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNT_BALANCE_REQUEST:
      return { loading: true }
    case ACCOUNT_BALANCE_SUCCESS:
      return { loading: false, balance: action.payload }
    case ACCOUNT_BALANCE_FAIL:
      return { loading: false, error: action.payload }
    case ACCOUNT_BALANCE_RESET:
      return {}
    default:
      return state
  }
}
