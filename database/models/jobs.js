process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const mongoose=require('mongoose');
const validator=require('validator')
const slugify=require('slugify')
const geoCoder=require('../../utils/geocoder')
const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        maxlength:[100, 'Job Title must be less than 100 characters long']
    },
    slug:{
        type:String
    },
    description:{
        type:String,
        required:[true, 'Please enter job Description '],
        minlength:[5, 'Job Description must be atleast 5 characters long'],
        maxlength:[100, 'Job Description must be less than 100 characters long']
    },
    email:{
        type:String,
        validate : [validator.isEmail, 'Please add a valid email address.']
    },
    address:{
        type:String,
        required:[true, 'Please enter job Address ']
    },
    location:{
        type:{
            type:String,
            enum:['Point']
        },
        coordinates:{
            type:[Number],
            index: '2dsphere'
        },
        formattedAddress:String,
        city:String,
        state:String,
        zipcode:String,
        country:String
    },
    company:{
        type:String,
        required:[true, 'Please enter job Company']
    },
    industry:{
        type:[String],
        required:[true,'Please select industry'],
        enum : {
            values:['IT','Business','Entertainment','banking','education','training','telecom','others'],
            message:'Please select industry'
        }
    },
    jobtype:{
        type:[String],
        required:[true,'Please select job type'],
        enum : {
            values:['Full Time','Part Time','Contract','Internship'],
            message:'Please select job type'
        }
    },
    minEducation:{
        type:String,
        required:[true,'Please select minimum education'],
        enum : {
            values:['Bachelors','Masters','Phd'],
            message:'Please select minimum education'
        }
    },
    positions:{
        type:Number,
        default:1
    },
    experience:{
        type:String,
        required:[true,'Please select experience'],
        enum : {
            values:['No experience','1 year- 2 years','2 year-5 year','5 years+'],
            message:'Please select experience'
    }
},
salary:{
    type:Number,
    required:[true,'please enter the expected salary for the job']
},
postingDate:{
    type : Date,
    default : Date.now
},
lastDate:{
    type: Date,
    default : new Date().setDate(new Date().getDate()+7)
},
applicantsApplied:{
    type: [Object],
    select:false
}
    })
    
    //Creating job slug before saving
    jobSchema.pre('save',function(next){
        
        this.slug=slugify(this.title,{lower:true});
        next();
    })
    //setting up location
    jobSchema.pre('save',async function(next){
       const loc=await geoCoder.geocode(this.address);
       this.location={
        type:'Point',
        coordinates:[loc[0].longitude,loc[0].latitude],
        formattedAddress:loc[0].formattedAddress,
        city:loc[0].city,
        state:loc[0].stateCode,
        zipcode:loc[0].zipcode,
        country:loc[0].countryCode
       }
     
    })
    jobSchema.index({ title: 'text' })

    
    module.exports=mongoose.model('Job',jobSchema);