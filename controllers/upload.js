module.exports=(req,res)=>{
    if(req.session.userId){
       return res.render('imgupload');
    }
    res.redirect('/authlogin')
    
};