
const Job=require('../database/models/jobs')
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors=require('../middleware/catchAsyncErrors')
module.exports=catchAsyncErrors(async(req,res,next)=>{
    const job=await Job.findById(req.params.id);

    if(!job){
       return next(new ErrorHandler('Job not found',404))
    }
    job=await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        message:"Job deleted",
        data:job
    })
})
//get a single job with id and slug =>/jobssingle/:id/:slug

