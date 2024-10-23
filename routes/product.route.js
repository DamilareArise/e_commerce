const express = require('express')
const { addProduct, allProduct, deleteProduct, editProduct } = require('../controllers/product.controller')

const route = express.Router()

route.post('/add-product', addProduct)
route.get("/all-product", allProduct)
route.delete('/delete-product/:id', deleteProduct)
route.put('/edit-product/:id', editProduct)


module.exports = route