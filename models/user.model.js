const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    fullname: {type:String, require:true},
    email: {type:String, require:true, unique:true},
    password:{type:String, require:true},
    date_created:{type:Date, default: Date.now}
})

const UserModel = mongoose.model('user_collection', UserSchema)

module.exports = { UserModel }