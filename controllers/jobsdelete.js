
const Job=require('../database/models/jobs')
module.exports=async(req,res,next)=>{
    const job=Job.findById(req.params.id);

    if(!job){
        return res.status(404).json({
            success:false,message:'Job not found'
        });
    }
    job=await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        message:"Job deleted",
        data:job
    })
}
//get a single job with id and slug =>/jobssingle/:id/:slug

