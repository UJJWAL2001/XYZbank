import {
  ACCOUNT_BALANCE_RESET,
  ACCOUNT_CREATE_RESET,
} from '../constants/accountConstants'
import { DEPOSIT_AMOUNT_RESET } from '../constants/transcationConstants'

export const resetState = () => async (dispatch) => {
  dispatch({ type: DEPOSIT_AMOUNT_RESET })
  dispatch({ type: ACCOUNT_BALANCE_RESET })
  dispatch({ type: ACCOUNT_CREATE_RESET })
}
