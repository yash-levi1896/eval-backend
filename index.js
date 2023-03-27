const express=require('express');
require('dotenv').config();
const {authentication}=require('./middleware/autentication.middleware');
const cors=require('cors')
const app=express();

const connection =require('./db');
const { userRoute } = require('./Routes/user.route');
const { postRoute } = require('./Routes/post.route');
app.use(express.json());
app.use(cors())
app.use("/users",userRoute);
app.use(authentication)
app.use("/posts",postRoute);
app.listen(process.env.port,async()=>{
     try {
        await connection
        console.log('connected to db')
     } catch (error) {
        console.log(error)
     }
     console.log('server is running');
    
})