'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Category,
  Orders,
  ProductOrders
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'claire@email.com', password: 'quarantini'})
  ])

  const categories = await Promise.all([Category.create({name: 'Vodka'})])

  const products = await Promise.all([
    Product.create({
      title: 'Martini',
      description: 'Glorified way to drink liquor straight',
      price: 12,
      quantity: 5,
      categoryId: 1
    }),
    Product.create({
      title: 'Moscow Mule',
      description: 'Everyone likes it because you get it in a copper mug',
      price: 10,
      quantity: 10
    })
  ])

  const orders = await Promise.all([
    Orders.create({price: 22, quantity: 2, userId: 3}) // how does our through table know how many products per order we get?
    //order can have qty total but it also needs to get the productId and orderId from the thorugh table to display in  the order
  ])

  const productOrder = await Promise.all([
    ProductOrders.create({quantity: 3, orderId: 1, productId: 1})
  ])

  // const productOrder = await Promise.all([
  //   ProductOrders.create({quantity: 3}), //how do we get the current price of the product with the productId into this model instance?
  // ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded ${productOrder.length} product-order`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
