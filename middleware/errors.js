const ErrorHandler = require('../utils/errorHandler');
module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    if(process.env.NODE_ENV==='development'){
        res.status(err.statusCode).json({
            success:false,
            errMessage:err.message,
            stack:err.stack
    })
}

    if(process.env.NODE_ENV==='production'){
        let err={...err}
        err.message=err.message;
        //wrong mongoose object id error
        if(err.name==='CastError'){
            const message=`resource not fount invalid.${err.path}`
            error=new ErrorHandler(message,404) 
        }
        //handling mongoose validation error
        if(err.name==='ValidationError'){
            const message=Object.values(err.errors).map(value=>value.message)
            error=new ErrorHandler(message,400) 
        }

        res.status(error.statusCode).json({
            success:false,
            message:err.message || "Internal Server error"
    })
}
next()
}