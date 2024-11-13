const express = require('express')
const { addProduct, allProduct, deleteProduct, editProduct } = require('../controllers/product.controller')
const { verifyAuth } = require('../controllers/user.controller')

const route = express.Router()


route.post('/add-product',verifyAuth, addProduct)
route.get("/all-product", allProduct)
route.delete('/delete-product/:id', verifyAuth, deleteProduct)
route.put('/edit-product/:id', verifyAuth, editProduct)


module.exports = route