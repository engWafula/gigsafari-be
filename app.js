const express = require("express")
const feedRoutes = require("./routes/job")
const authRoutes = require("./routes/auth")

const bodyPaser = require("body-parser")
const mongoose = require("mongoose")
const path = require("path")
const multer = require("multer")


const app = express()

const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toISOString() + "-" + file.originalname)
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single("image"))

app.use(bodyPaser.json())
app.use("/images",express.static(path.join(__dirname,"images")))

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*")
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization')
    next()
})

 app.use("/job",feedRoutes)
 app.use("/auth",authRoutes)


 app.use((error,req,res,next)=>{
  console.log(error)
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  res.status(status).json({message:message,data:data})
 })
const port = process.env.PORT || 9000
 mongoose.connect("mongodb+srv://wafula:wafula1998@cluster0.4bilpqu.mongodb.net/?retryWrites=true&w=majority").then(()=>{
     app.listen(port,()=>{
        console.log(`App listening on port ${port}`)
     })

 }).catch((err)=>{
   console.log(err)
 })

