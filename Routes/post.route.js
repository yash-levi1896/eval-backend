const express=require('express');
const postRoute=express.Router();
const jwt=require('jsonwebtoken');
const {PostModel}=require('../Models/post.model')


postRoute.get("/",async(req,res)=>{
     let token=req.headers.authorization.split(' ')[1];
     let decoded=jwt.verify(token,"masai");
     let device1=req.query.device1;
     let device2=req.query.device2;
     let skip=(req.query.page-1)*3
     let post=await PostModel.find({userID:decoded.userID}).skip(skip).limit(3);
     res.status(200).send(post);
})



postRoute.post("/add",async(req,res)=>{
    try {
        await PostModel.insertMany([req.body]);
        //post.save();
        res.status(200).send({"msg":"post is added"});
    } catch (error) {
        res.status(400).send({"msg":error.message})
    } 
})

postRoute.patch("/update/:postID",async(req,res)=>{
    let {postID}=req.params
    try {
        await PostModel.findByIdAndUpdate({_id:postID},req.body);
        res.status(200).send({msg:"post udated!"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

postRoute.delete("/delete/:postID",async (req,res)=>{
    let {postID}=req.params
    try {
        await PostModel.findByIdAndDelete({_id:postID});
        res.status(200).send({msg:"post deleted!"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})














module.exports={postRoute}