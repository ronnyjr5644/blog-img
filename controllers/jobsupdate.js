const Job=require('../database/models/jobs')
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors=require('../middleware/catchAsyncErrors')
module.exports=catchAsyncErrors(async(req,res,next)=>{
    let job=await Job.findById(req.params.id);
    if(!job){
        return next(new ErrorHandler('Job not found',404))
    }
    job=await Job.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        message:"Job updated",
        data:job

})
})

