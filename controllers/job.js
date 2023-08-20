const { validationResult } = require("express-validator/check")
const User = require("../Models/user")
const Job = require("../Models/job")


exports.createJobs = async (req, res, next) => {
  const {
    title,
    companyName,
    location,
    jobType,
    workType,
    salary,
    jobDescription,
    requirements,
    howToApply,
    deadline,
    link
  } = req.body;
    try {

      const newJob = new Job({
        title,
        companyName,
        location,
        jobType,
        workType,
        salary,
        jobDescription,
        requirements,
        howToApply,
        deadline,
        link,
        expireAt: new Date(deadline)

      });
  
       await newJob.save();
      res.status(201).json({message:"Job created successfully"});

    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

  exports.updateJob = async(req,res,next)=>{
    try {
      const {
        title,
        companyName,
        location,
        jobType,
        workType,
        salary,
        jobDescription,
        requirements,
        howToApply,
        deadline,
        link
      } = req.body;
      const {id} = req.params

      await Job.findOneAndUpdate({_id:id},{
        title,
        companyName,
        location,
        jobType,
        workType,
        salary,
        jobDescription,
        requirements,
        howToApply,
        deadline,
        link
        })
        res.status(201).json({ data: 'Job updated successfully' })

    } catch (error) {
      console.log(error)
    }
  }


  exports.getJobs = async(req,res,next)=>{
 try {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const pageSize = 10; 
  const skip = (page - 1) * pageSize;
  const data = await Job.find().sort({ createdAt: 'desc' })
  .skip(skip)
  .limit(pageSize);
  res.status(200).json({data:data,count:data.length})
 } catch (error) {
  console.log(error)
 }
  }


  exports.getJob = async(req,res,next)=>{
    try {
      const {id} = req.params
      const job = await Job.findById(id)
      res.status(200).json({data:job})
    } catch (error) {
      console.log(error)
    }
  }

  exports.deleteJob = async(req,res,next)=>{
    try {
      const {id} = req.params
      await Job.findByIdAndDelete(id)
      res.status(200).json({message:"Job deleted successfully"})
    } catch (error) {
      console.log(error)
    }
  }