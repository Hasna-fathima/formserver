const express=require('express');
const {upload}=require ('../Routers/upload.js');
const {Addpost,getPosts,updatePost,postDelete,getImgByid}=require('../Controllers/postController.js');
const passport =require('../passport.js');

const postRouter=express.Router()


postRouter.post('/',passport.authenticate('jwt', { session: false }), upload.single('image'),Addpost);
postRouter.get('/',getPosts);
postRouter.patch('/:id', updatePost);
postRouter.delete('/:id',postDelete);
postRouter.get('/images/:id',getImgByid)



module.exports=postRouter