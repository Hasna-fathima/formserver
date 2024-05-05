const postmodel=require ('../model/postmodel')
const path = require('path')
const fs=require('fs');



const Addpost=async(req,res)=>{
    try{
      console.log(req.file.filename)
        var postItem={
            image:req.file.filename,
            title:req.body.title,
            subtitle:req.body.subtitle,
            desc:req.body.desc

        }
        var newpost=new postmodel(postItem);
        await newpost.save();
        res.status(201).json(postItem)

    }catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  
}
}
const getPosts=async(req,res)=>{
    try {
        const posts = await postmodel.find({});
        if (!posts) {
          return res.status(404).json({ error: 'post not found' });
        }
        return res.status(200).json(posts);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    };

    const updatePost = async (req, res) => {
      try {
        const postItem = await postmodel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        if (!postItem) {
          return res.status(404).json({ error: 'Posts are  not found' });
        }
        res.status(200).json(postItem);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    };
    const postDelete = async (req, res) => {
  try {
    const deletedPost = await postmodel.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).send('Post not found');
    }
    return res.status(200).send('Deleted');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const getImgByid=async(req,res)=>{
  try{
    const id=req.params.id
    const post=await postmodel.findById(id).exec()
    if(!post)return res.status(404).json({error:'image not found'})
    const dirname=path.resolve()
  const imagepath=path.join(dirname,'uploads',post.image)
  
  
  if(!fs.existsSync(imagepath)){
    res.status(404).json({error:"image file not found"})

  }
  res.sendFile(imagepath)
  }
 catch (error) {
  console.log(error);
  return res.status(500).json({ error: 'Internal server error' });
}
}

module.exports={Addpost,getPosts,updatePost,postDelete,getImgByid}