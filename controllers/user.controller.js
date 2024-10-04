const express = require('express')
const { UserModel } = require('../models/user.model')
const nodemailer = require('nodemailer')



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

        res.send({status:true, data})
    })
    .catch((err)=>{
        res.send({status:false, message:'Unable to register user'})
    })

}



module.exports = {registerUser}