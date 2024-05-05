const express= require('express');
const Usermodel=require ('../model/usermodel');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt=require ('jsonwebtoken')


const Addnewuser = async (req, res) => {
  try {
      // Hash the password asynchronously
      bcrypt.hash(req.body.password, saltRounds, async (err, hashedpassword) => {
          if (err) {
              console.log("error occurred while hashing", err);
              return res.status(500).json({ error: 'Internal server error' });
          }

          // Create a new user object with hashed password
          const newUser = {
              firstname: req.body.firstname,
              username: req.body.username,
              email: req.body.email,
              password:hashedpassword // Store the hashed password
          };

          // Save the new user to the database
          try {
        
              const user = await Usermodel.create(newUser);
              res.status(201).json(user); 
          } catch (error) {
              console.log("error occurred while saving user to database", error);
              res.status(500).json({ error: 'Internal server error' });
          }
      });
  } catch (error) {
      console.log("error occurred in try block", error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllusers = async (req, res) => {
  try {
    const users = await Usermodel.find({});
    if (!users) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getoneuserById = async (req, res) => {
  try {
    const user = await Usermodel.findById(req.params.username).exec();
    if(!user){
      return res.status(4040).json({error:"user is not found"})
    
    }
     res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateuserById = async (req, res) => {
  try {
    const userItem = await Usermodel.findByIdAndUpdate(
      req.params.userid,
      req.body,
      { new: true }
    );
    if (!userItem) {
      return res.status(404).json({ error: 'users are  not found' });
    }
    res.status(200).json(userItem);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


const deleteuser = async (req, res) => {
  try {
    await Usermodel.findOneAndDelete(req.params.userid);
    return res.status(200).send('Deleted');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const login=async(req,res)=>{
  try{

    const {email,password}=req.body
    const user=await Usermodel.findOne({email:email})
    if(!user){
      return res.status(404).json({message:"user is not found"})
    }
    const isValid=await bcrypt.compare(password,user.password)
    if(!isValid){
      return res.status(500).json({message:"invalid credentials"})
    }
    let payload={user:email,pwd:password}
    let token=jwt.sign(payload,'reactblogapp')
    res.status(200).json({messahe:"Login successfully",token:token})
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {Addnewuser,getAllusers, getoneuserById, updateuserById, deleteuser,login};