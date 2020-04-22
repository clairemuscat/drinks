import React from 'react'
import {fetchProductThunk} from '../store.product'
import {connect} from 'react-redux'

export class Product extends React.Component {
  render() {
    return (
      <div>
        <h3>PRODUCT NAME HERE</h3>
        <img src="IMAGE HERE" />
        <div>PRODUCT PRICE HERE</div>
        <p>PRODUCT DESCRIPTION HERE</p>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  product: state.product
})

export const mapDispatchToProps = dispatch => {
  return {
    getProduct: id => dispatch(fetchProductThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
