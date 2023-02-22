const User=require('../database/models/user');
module.exports=(req,res,next)=>{
    //fetch user from data base
    User.findById(req.session.userId,(error,user)=>{
        if(error || !user){
            return res.redirect('/')
        }
        next();
    })

    //verify user


    //if user is valid permit


    //redirect

}