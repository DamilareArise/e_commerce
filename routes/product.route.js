const express = require('express')
const { addProduct, allProduct, deleteProduct } = require('../controllers/product.controller')

const route = express.Router()

route.post('/add-product', addProduct)
route.get("/all-product", allProduct)
route.delete('/delete-product/:id', deleteProduct)


module.exports = route