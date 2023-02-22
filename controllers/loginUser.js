const bcrypt=require('bcrypt')
const User=require('../database/models/user')

module.exports=(req,res)=>{
    const {email,password}= req.body
    //will find user
    User.findOne({email},(error,user)=>{
        if(user){
            //compare password
            bcrypt.compare(password,user.password,(error,same)=>{
                if(same){
                    //login
                    req.session.userId=user._id
                    res.redirect('/')
                }else{
                    return res.redirect('/authlogin')
                }
            })
        }else{
            return res.redirect('/authlogin')
        }
    })
    //compare with user password

    //if password is correct,login user

    //else redirect user back


}