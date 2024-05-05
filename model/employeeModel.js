const express= require('express');
const mongoose =require ('mongoose')

const employeeSchema=new mongoose.Schema({
    name:String,
    age:String,
    rank:String,
    
})
const employeemodel=mongoose.model('employees',employeeSchema,"employees");
employeemodel.collection.createIndex({name:1},{unique:true})
module.exports= employeemodel

