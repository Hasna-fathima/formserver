const express= require('express');
const {Addnewuser,login,getAllusers,getoneuserById,updateuserById,deleteuser}=require ('../Controllers/userController.js')
const userRouter=express.Router();


userRouter.post('/',Addnewuser);
userRouter.post('/login',login)
userRouter.get('/',getAllusers);
userRouter.get('/:username/:username',getoneuserById);
userRouter.patch('/:userid',updateuserById,);
userRouter.delete('/:userid',  deleteuser);


module.exports= userRouter