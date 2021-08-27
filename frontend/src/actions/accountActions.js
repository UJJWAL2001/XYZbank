import axios from 'axios'
import {
  ACCOUNT_BALANCE_FAIL,
  ACCOUNT_BALANCE_REQUEST,
  ACCOUNT_BALANCE_SUCCESS,
  ACCOUNT_CREATE_FAIL,
  ACCOUNT_CREATE_REQUEST,
  ACCOUNT_CREATE_SUCCESS,
} from '../constants/accountConstants'

export const createNewAccount =
  (name, dob, pin, accountType, address) => async (dispatch) => {
    try {
      dispatch({ type: ACCOUNT_CREATE_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/accounts',
        { name, dob, pin, accountType, address },
        config
      )

      dispatch({ type: ACCOUNT_CREATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ACCOUNT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const accountBalance = (accountNo) => async (dispatch) => {
  try {
    dispatch({ type: ACCOUNT_BALANCE_REQUEST })

    const { data } = await axios.get(`/api/accounts/${accountNo}`)

    dispatch({ type: ACCOUNT_BALANCE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACCOUNT_BALANCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
