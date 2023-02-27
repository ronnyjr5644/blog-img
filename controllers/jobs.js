const Job=require("../database/models/jobs")
const catchAsyncErrors=require('../middleware/catchAsyncErrors')
const APIFilters=require('../utils/apiFilters')
module.exports=async(req,res)=>{
    const apiFilters=new APIFilters(Job.find(),req.query)
    // ).filter().sort().limitFields().searchByQuery();
    
    const jobs=await apiFilters.query;
    res.status(200).json({
        success: true,
        results: jobs.length,
        data:jobs
    }) 
  
  }
  //create a new job => /api/v1/job/new
