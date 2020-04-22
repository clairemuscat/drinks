const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrders = db.define('product-orders', {
  //   orderId: {
  //     type: Sequelize.INTEGER,
  //     allowNull: false,
  //   },
  //   productId: {
  //     type: Sequelize.INTEGER,
  //     allowNull: false,
  //   },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  purchasePrice: {
    //perhaps to keep track of the price at which a product was purchased at? think about when you would populate this column
    type: Sequelize.INTEGER,
    defaultValue: null
  }
})

module.exports = ProductOrders
