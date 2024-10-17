const express = require('express')
const { UserModel } = require('../models/user.model')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')



const registerUser = (req, res)=>{
    const {fullname, email, password} = req.body

    const user = new UserModel(req.body)
    user.save()
    .then((data)=>{
        // send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.PASS
            }
        })
        const mailOptions = {
            from: process.env.APP_EMAIL,
            to: [data.email, process.env.APP_EMAIL],
            subject: 'Welcome to our website',
            text: `Hello ${data.fullname}, welcome to our website. Your account has been created`
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Could not send email');
            }
            else{
                console.log('Email sent: ' + info.response);
            }
        })

        res.send({status:true, message: 'registration successfull', data})
    })
    .catch((err)=>{
    
        res.send({status:false, message:'Unable to register user'})
    })

}


const loginUser = (req, res) =>{
    const {email, password} = req.body
    UserModel.findOne({email})
    .then((data)=>{
        if(data){
            data.validatePassword(password, (err, isMatch) => {
                if(isMatch){
                    const token = jwt.sign({ id:data._id }, process.env.SECRET_KEY, {expiresIn: 60})

                    res.send({status:true, message:'login sucessfully', data, token})
                }
                else{
                    res.send({status:false, message: 'Invalid email or password'})
                }
            })
        }
        else{
            res.send({status:false, message:'Invalid email or password'}) 
        }
        
    })
    .catch((err)=>{
        res.send({status:false, message: `error occured: ${err.message}`})
    })

}


const verifyAuth = (req, res) => {
    let token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if(err){
            res.send({status:false, message: 'Invalid token'})
        }
        else{
            id = decoded.id
            UserModel.findOne({_id:id})
            .then((data)=>{
                if(data){
                    res.send({status:true, message: 'token verified', data: decoded})
                }else{
                    res.send({status:false, message: 'Invalid token'})
                }
            })
            .catch((err)=>{
                res.send({status:false, message: 'Error validating token'})
            })
            
        }
    })


}



module.exports = {registerUser, loginUser, verifyAuth}