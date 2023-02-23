const Job=require('../database/models/jobs')
module.exports=async(req,res,next)=>{
    let job=await Job.findById(req.params.id);
    if(!job){
        return res.status(404).json({
            success:false,
            message:"Job not found"
        });
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
}

