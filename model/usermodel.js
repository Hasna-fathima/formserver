const express= require('express');
const mongoose =require ('mongoose')




const userSchema=new mongoose.Schema({
    firstname:String,
    username:String,
    email:String,
    password:String
    
})
const Usermodel=mongoose.model('user',userSchema)


 module.exports= Usermodel

