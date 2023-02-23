//search job with radius=>api/v1/jobs/:zipcode/:distance
const Job=require('../database/models/jobs')
const geoCoder=require('../utils/geocoder')
module.exports=async(req,res,next) => {
    const {zipcode, distance}=req.params;
    //get lat/lng from geocoder
    const loc=await geoCoder.geocode(zipcode);
    const lat=loc[0].latitude;
    const lng=loc[0].longitude;
    //calc radius using radians
    const radius=distance/3963;
    
   const jobs= await Job.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], distance]
            }
        }
    })
    res.status(200).json({
        success: true,
        results: jobs.length,
        data: jobs
    })
}
