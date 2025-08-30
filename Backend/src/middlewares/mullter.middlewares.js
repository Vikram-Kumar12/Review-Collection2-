import multer from 'multer'

const storage = multer.memoryStorage();

const fileFilter = (req,file,cb)=>{
    const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4'];
    if(allowedTypes.includes(file.mimetype)) cb(null,true);
    else cb(new Error('Invalid file type'),false);
}
export const upload = multer({storage, fileFilter});