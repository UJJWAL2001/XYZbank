import {
  DEPOSIT_AMOUNT_FAIL,
  DEPOSIT_AMOUNT_REQUEST,
  DEPOSIT_AMOUNT_RESET,
  DEPOSIT_AMOUNT_SUCCESS,
  TRANSFER_AMOUNT_FAIL,
  TRANSFER_AMOUNT_REQUEST,
  TRANSFER_AMOUNT_RESET,
  TRANSFER_AMOUNT_SUCCESS,
  WITHDRAW_AMOUNT_FAIL,
  WITHDRAW_AMOUNT_REQUEST,
  WITHDRAW_AMOUNT_RESET,
  WITHDRAW_AMOUNT_SUCCESS,
} from '../constants/transcationConstants'

export const amountDepositReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPOSIT_AMOUNT_REQUEST:
      return { loading: true }
    case DEPOSIT_AMOUNT_SUCCESS:
      return { loading: false, depositInfo: action.payload }
    case DEPOSIT_AMOUNT_FAIL:
      return { loading: false, error: action.payload }
    case DEPOSIT_AMOUNT_RESET:
      return {}
    default:
      return state
  }
}

export const amountWithdrawReducer = (state = {}, action) => {
  switch (action.type) {
    case WITHDRAW_AMOUNT_REQUEST:
      return { loading: true }
    case WITHDRAW_AMOUNT_SUCCESS:
      return { loading: false, withdrawInfo: action.payload }
    case WITHDRAW_AMOUNT_FAIL:
      return { loading: false, error: action.payload }
    case WITHDRAW_AMOUNT_RESET:
      return {}
    default:
      return state
  }
}

export const amountTransferReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSFER_AMOUNT_REQUEST:
      return { loading: true }
    case TRANSFER_AMOUNT_SUCCESS:
      return { loading: false, transferInfo: action.payload }
    case TRANSFER_AMOUNT_FAIL:
      return { loading: false, error: action.payload }
    case TRANSFER_AMOUNT_RESET:
      return {}
    default:
      return state
  }
}
