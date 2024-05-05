const express= require('express');
const userRouter =require('./Routers/userRouter.js');
const employeeRouter=require('./Routers/employeeRouter.js');
const postRouter= require ('./Routers/postRouter.js');
const path = require('path')
const mongoose=require ('mongoose');
const cors= require ('cors');
const app = express();

app.use(express.json());
port=3000,
app.use(cors());


app.use('/users',userRouter);
app.use('/employee',employeeRouter);
app.use('/posts',postRouter)
 const dirname=path.resolve()
 app.use(express.static(path.join(dirname,'uploads')))


mongoose.connect('mongodb+srv://admin:trEAit6zv0HVrE1f@cluster0.qrujazr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(()=>{console.log("db connected")
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})


  .catch(err => {console.log(err)})





