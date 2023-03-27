const express=require('express');
//const mongoose=require('mongoose');
const userRoute=express.Router();
const bcrypt=require('bcrypt');
const { UserModel } = require('../Models/user.model');
const jwt=require('jsonwebtoken');


userRoute.post("/register",async(req,res)=>{
    let {name,email,gender,password,city,is_married,age}=req.body;
    const user=await UserModel.find({email});
    try {
        
        //console.log(user)
        if(user.length===0){
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    throw err
                }
                await UserModel.insertMany([{name,email,gender,password:hash,city,age,is_married}]);
                res.status(200).send({msg:"user registered!"});
            })
        }
        else{
            res.status(400).send({msg:"user already exist please Login!"})
        }
    } catch (error) {
        res.status(400).send({msg:"error can't register the user"})
    }
})

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        let user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,async(err,result)=>{
                if(err)
                throw err;
                if(result){
                    res.status(200).send({msg:"sucessfully Login!","token":jwt.sign({'userID':user[0]._id},'masai')})
                }else{
                    res.status(400).send({msg:"Wrong credentials"})
                }
            })
        }
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})






module.exports={userRoute};
