import axios from 'axios'
import {
  DEPOSIT_AMOUNT_FAIL,
  DEPOSIT_AMOUNT_REQUEST,
  DEPOSIT_AMOUNT_SUCCESS,
  TRANSFER_AMOUNT_FAIL,
  TRANSFER_AMOUNT_REQUEST,
  TRANSFER_AMOUNT_SUCCESS,
  WITHDRAW_AMOUNT_FAIL,
  WITHDRAW_AMOUNT_REQUEST,
  WITHDRAW_AMOUNT_SUCCESS,
} from '../constants/transcationConstants'

export const depositAmount =
  (depositedBy, accountNo, amount) => async (dispatch) => {
    try {
      dispatch({ type: DEPOSIT_AMOUNT_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/transcations/deposit',
        { depositedBy, accountNo, amount },
        config
      )

      dispatch({ type: DEPOSIT_AMOUNT_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: DEPOSIT_AMOUNT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const withdrawAmount = (pin, accountNo, amount) => async (dispatch) => {
  try {
    dispatch({ type: WITHDRAW_AMOUNT_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/transcations/withdraw',
      { pin, accountNo, amount },
      config
    )

    dispatch({ type: WITHDRAW_AMOUNT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: WITHDRAW_AMOUNT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const transferAmount =
  (toAccountNo, fromAccountNo, amount, toName) => async (dispatch) => {
    try {
      dispatch({ type: TRANSFER_AMOUNT_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/transcations/transfer',
        { toAccountNo, fromAccountNo, amount, toName },
        config
      )

      dispatch({ type: TRANSFER_AMOUNT_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: TRANSFER_AMOUNT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
