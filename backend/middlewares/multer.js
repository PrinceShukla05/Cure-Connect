import multer from 'multer'
//multer is used to store on the server side
//
const storage=multer.diskStorage({
    filename: function(req,file,callback){
        callback(null,file.originalname)
    }
})

const upload =multer({storage})

export default upload
// study what does this