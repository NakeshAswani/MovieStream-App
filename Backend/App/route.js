const express=require('express')

const route=express.Router()

route.use('/user',require('./Routes/user_route'))



module.exports=route