const User = require("../Models/user")
const { validationResult } = require("express-validator/check")
const bycrpt = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.signUp = async (req,res,next)=>{
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
     try {
        const person = await User.findOne({email:email})

        if(person){
          return res.status(401).json({message:"User with this email already exists"})            

        }

        const hashedPassword = await bycrpt.hash(password,12)
        const user = new User({
            email:email,
            password:hashedPassword,
            name:name
        })

        const result = await user.save()
        res.status(201).json({message:"User Created",userId:result._id})

     } catch (err) {
         
    if(!err.statusCode){
        err.statusCode = 500
    }
    next(err)
     }
}

exports.login = async (req,res,next)=>{
    const email = req.body.email
    const password = req.body.password
    let loadedUser

    try {
        const user = await User.findOne({email:email})

        if(!user){
            const error = new Error("User with this email couldn't be found")
            error.statusCode = 422
            error.data = error.array()
            throw error
             }
        const isEqual = await   bycrpt.compare(password,user.password)
        if(!isEqual){
            const error = new Error("Invalid Password")
            error.statusCode = 422
            error.data = error.array()
            throw error
        }
        const token = jwt.sign({
            email:user.email,
            userId:user._id.toString()
        },'wafulaallanisaac',{
            expiresIn:"1h"
        })

        res.status(200).json({token:token,userId:user._id.toString()})
   
        return ;
       
    } catch (err) {
        if(!err.statusCode){
            err.statusCode = 500
        } 
        next(err)
        return err
    }
    
}


exports.getUserStatus = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        const error = new Error('User not found.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ status: user.status });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
  
  exports.updateUserStatus = async (req, res, next) => {
    const newStatus = req.body.status;
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        const error = new Error('User not found.');
        error.statusCode = 404;
        throw error;
      }
      user.status = newStatus;
      await user.save();
      res.status(200).json({ message: 'User updated.' });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
  