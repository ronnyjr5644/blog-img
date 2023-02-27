const catchAsyncErrors=require('../middleware/catchAsyncErrors')
const Job=require('../database/models/jobs');
module.exports=catchAsyncErrors (async(req,res)=>{
    console.log(req.body.title);
    const job= await Job.create(req.body);
    res.status(200).json({
        success: true,
        message: 'job created successfully',
        data: job
    });
    
  })