const express = require('express')
const app = express()
const mongoose = require('mongoose')
const productRoute  = require('./routes/product.route')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
require('dotenv').config()


const URI = process.env.DATABASE_URI
mongoose.connect(URI)
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.log('connection failed')
})



app.use('/product', productRoute)

app.get('/', (req, res)=>{
    res.send('Hello world')
})


const PORT = 5000
app.listen(PORT, (err)=>{
    if(!err){
        console.log('Server running on port 5000');
    }
    else{
        console.log('Unable to run server');
    }
})

// MVCR