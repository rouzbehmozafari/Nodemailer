const express = require('express')
const nodemailer = require('nodemailer')
const formidable = require('formidable');
const dotenv = require('dotenv').config()
const sendEmail = require('./helper/sendEmail')
const random = require('./helper/random')

const users = []

const app = express()
app.set('view engine','ejs')
app.use(express.static('public'))
app.use((req,res,next)=>{
    console.log(req.url)
    next()
}
)

app.get('/',(req,res)=>{
    res.render(__dirname+'/pages/views/home.ejs')
    
})
app.post('/new',(req,res)=>{
    const form = formidable()
    form.parse(req, (err,fields,_)=>{
        const name = fields.name
        const email = fields.email
        const oneTimeNum = random()
        const newUser = {
            'name': name ,
            'email' : email ,
            'isAuth' : false ,
            'authNum' : oneTimeNum
        }
        users.push(newUser)
        console.log(users)
        // console.log(users[0].email)
        // console.log(users[0].authNum)
        sendEmail({
            to: newUser.email,
            subject: "Prove you are authentic!",
            message: `Hi !
            
            thank you for joining Flakebook.
            
            To use your account, prove you are authentic!
    
            Enter this 6 digit code in your profile:
    
            ${newUser.authNum}
        
            See you soon!
            -- Super Coder Pro, Your Flakebook Admin
    
            PS: Do not reply to this email I won't open them.
            `
        })
        res.render(__dirname+'/pages/views/validation.ejs')
        // 


    })

})
app.post('/validationPost',(req,res)=>{
    const form = formidable()
    form.parse(req, (err,fields,_)=>{
        const inputAuth = fields.inputAuth
        if (Number(inputAuth) === users[0].authNum){
            users[0].isAuth = true
        }
        // res.render()
    })


})

const PORT = 6060
app.listen(PORT,console.log('on: ',PORT))


