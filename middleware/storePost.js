module.exports=(req,res,next)=>{
    if(!req.body.title || !req.body.description || !req.body.content){
        return res.redirect('/posts')
    }
    next();
}