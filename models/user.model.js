const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const UserSchema = mongoose.Schema({
    fullname: {type:String, require:true},
    email: {type:String, require:true, unique:true},
    password:{type:String, require:true},
    date_created:{type:Date, default: Date.now}
})


let saltRound = 10
UserSchema.pre('save', function (next){
    bcrypt.hash(this.password, saltRound, (err, hashedPassword) => {
        console.log(this.password, hashedPassword);
        if (err) {
            console.log('password could not be hashed');
        }
        else {
            this.password = hashedPassword
            next()
        }
    })
})



const UserModel = mongoose.model('user_collection', UserSchema)

module.exports = { UserModel }