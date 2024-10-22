const express = require('express')
const { ProductModel } = require('../models/product.model')



const addProduct = (req, res)=>{
    const {title, price, description, image, quantity} = req.body
    const product = new ProductModel({
        title,
        price,
        description,
        image,
        quantity
    })
    product.save()
    .then((data)=>{
        res.send({status:true, data})
    })
    .catch((err)=>{
        res.send({status:false, message:'add product failed'})
    })
}

const allProduct = (req, res)=>{
    ProductModel.find()
    .then((data)=>{
        res.send({status:true, data})
    })
    .catch((err)=>{
        res.send({status:false, message:"unable to fetch product"})
    })
}


const deleteProduct = (req, res) =>{

   let id = req.params.id

   ProductModel.findByIdAndDelete(id)
   .then((data)=>{
    res.send({status:true, message:'Product deleted successfully', data})
   })
   .catch((err)=>{
    res.send({status:false, message:'Error occured while deleting product'})
   })

    
}

module.exports = { addProduct, allProduct, deleteProduct }