const Job=require('../database/models/jobs')
const catchAsyncErrors=require('../middleware/catchAsyncErrors')
module.exports=catchAsyncErrors(async(req,res)=>{
    const stats= await Job.aggregate([
        {
            $match:{$text:{$search:"\""+req.params.topic+"\""}}
        },
        {

            $group : {
                _id:{$toUpper:'$experience'},
                totalJobs:{$sum:1},
                avgPosition:{$avg:'$positions'},
                avgSalary:{$avg:'$salary'},
                minSalary:{$min:'$salary'},
                maxSalary:{$max:'$salary'}
            }
        }
    ]);
    if(stats.length===0){
        return res.status(404).json({message:'No jobs found'})
    }
    res.status(200).json({
        success:true,
        data:stats
    })
});
