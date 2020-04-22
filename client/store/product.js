import axios from 'axios'

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'

export const setSingleProduct = product => {
  return {
    type: SET_SINGLE_PRODUCT,
    product
  }
}

export const fetchProductThunk = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/products/${id}`, id)
      const product = response.data
      dispatch(setSingleProduct(product))
    } catch (err) {
      console.log('there was an error fetching the product: ', err)
    }
  }
}

const initialState = []

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
