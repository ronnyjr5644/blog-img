
const Job=require("../database/models/jobs")
module.exports=async(req,res)=>{
    const jobs=await Job.find();
    res.status(200).json({
        success: true,
        results: jobs.length,
        data:jobs
    }) 
  
  }
  //create a new job => /api/v1/job/new
