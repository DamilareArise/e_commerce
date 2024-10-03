const mongoose = require('mongoose')


const ProductSchema = mongoose.Schema({
    title:{type:String, require:true},
    price:{type:Number, require:true},
    description:{type:String, require:true},
    image:{type:String, require:true},
    quantity:{type:Number, require:true},
    date_created:{type:Date, default: Date.now}
})

const ProductModel = mongoose.model('product_collection', ProductSchema)

module.exports = {ProductModel}