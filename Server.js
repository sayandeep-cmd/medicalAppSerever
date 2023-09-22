const express=require('express')
const mongoose=require('mongoose')
const ejs=require('ejs')
const body_parser=require('body-parser')
const cors=require('cors')
const multer=require('multer')
const path=require('path')
const cookie_parser=require('cookie-parser')
const dotenv=require('dotenv')
const dbCon=require('./config/db')
dotenv.config() 

const app=express();
dbCon()

app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.set('views')
app.use(body_parser.urlencoded({extended:true}))
app.use(body_parser.json())
app.use(cors())
app.use(cookie_parser())
app.use(express.static('public'))

app.use('/upload',express.static(path.join(__dirname,"upload")))
app.use(express.static('upload'))

var storage=multer.diskStorage({
    filename:function(req,file,cb){
        let ext=path.extname(file.originalname)
        cb(null,Date.now()+ ext)
    },
    destination:function(req,file,cb){
        cb(null,'upload')
    }

})

const filefilter=(req,file,callback)=>{
    if(
        file.mimetype.includes('png') ||
        file.mimetype.includes('jpg') ||
        file.mimetype.includes('jpeg') ||
        file.mimetype.includes('webp')
    ){
        callback(null,true)
    }else{
        console.log("Error in Uploading");
        callback(null,false)
    }
}

app.use(
    multer({
        storage:storage,
        fileFilter:filefilter,
    }).single('image')
);


const Admin_Router=require('./Router/Admin_route')
app.use(Admin_Router)

const Api_router=require('./Router/Api_route')
app.use(Api_router)

//connect mongodb
const port=process.env.PORT || 12345

app.listen(port,()=>{
    console.log(`server running on port: http://localhost:${port}`);
})