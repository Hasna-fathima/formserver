const multer  = require('multer');
let fileName='';

const storage = multer.diskStorage({
    destination: function (req,image, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req,image, cb) {
      fileName=image.originalname

      cb(null,Date.now() +  '-' + fileName)
    }
})

const upload = multer({ storage: storage }) 

module.exports = 
{ upload} 