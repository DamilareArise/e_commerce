const express = require('express')
const { addProduct, allProduct } = require('../controllers/product.controller')

const route = express.Router()

route.post('/add-product', addProduct)
route.get("/all-product", allProduct)


module.exports = route