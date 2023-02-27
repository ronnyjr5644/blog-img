//get a single job with id and slug =>/jobssingle/:id/:slug
const Job=require('../database/models/jobs')
const catchAsyncErrors=require('../middleware/catchAsyncErrors')
module.exports=catchAsyncErrors(async(req,res,next)=>{
    const job=await Job.find({$and: [{_id:req.params.id},{slug:req.params.slug}]})

    if(!job || job.length===0){
        return res.status(404).json({
            success:false,
            message:'Job not found'
        })
    }
    res.status(200).json({success:true,
        data:job
    })
})