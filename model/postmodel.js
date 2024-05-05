const express= require('express');
const mongoose =require ('mongoose')




const postSchema=new mongoose.Schema({
    image:String,
    title:String,
    subtitle:String,
    desc:String,
    
    
})
const postmodel=mongoose.model('posts',postSchema)


 module.exports= postmodel

